import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Laptop } from './CatalogContext';
import { laptopsData } from '../data/laptops';

interface CartItem {
  laptopId: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartProducts: (Laptop & { quantity: number })[];
  addToCart: (laptopId: string) => void;
  removeFromCart: (laptopId: string) => void;
  updateQuantity: (laptopId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render and when user changes
  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`cart_${currentUser.id}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    } else {
      const storedCart = localStorage.getItem('cart_guest');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    }
  }, [currentUser]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cartItems));
    } else {
      localStorage.setItem('cart_guest', JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  const cartProducts = cartItems.map(item => {
    const laptop = laptopsData.find(l => l.id === item.laptopId);
    return {
      ...laptop!,
      quantity: item.quantity
    };
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartProducts.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const addToCart = (laptopId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.laptopId === laptopId);
      if (existingItem) {
        return prev.map(item =>
          item.laptopId === laptopId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { laptopId, quantity: 1 }];
    });
  };

  const removeFromCart = (laptopId: string) => {
    setCartItems(prev => prev.filter(item => item.laptopId !== laptopId));
  };

  const updateQuantity = (laptopId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(laptopId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.laptopId === laptopId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};