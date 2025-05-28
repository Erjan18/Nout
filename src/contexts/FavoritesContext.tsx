import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Laptop } from './CatalogContext';
import { laptopsData } from '../data/laptops';

interface FavoritesContextType {
  favorites: Laptop[];
  addToFavorites: (laptopId: string) => void;
  removeFromFavorites: (laptopId: string) => void;
  isFavorite: (laptopId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Laptop[]>([]);

  // Load favorites from localStorage on initial render and when user changes
  useEffect(() => {
    if (currentUser) {
      const storedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
      if (storedFavorites) {
        setFavoriteIds(JSON.parse(storedFavorites));
      } else {
        setFavoriteIds([]);
      }
    } else {
      const storedFavorites = localStorage.getItem('favorites_guest');
      if (storedFavorites) {
        setFavoriteIds(JSON.parse(storedFavorites));
      } else {
        setFavoriteIds([]);
      }
    }
  }, [currentUser]);

  // Update favorites when favoriteIds change
  useEffect(() => {
    const favoriteLaptops = laptopsData.filter(laptop => favoriteIds.includes(laptop.id));
    setFavorites(favoriteLaptops);
    
    // Save to localStorage
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(favoriteIds));
    } else {
      localStorage.setItem('favorites_guest', JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, currentUser]);

  const addToFavorites = (laptopId: string) => {
    if (!favoriteIds.includes(laptopId)) {
      setFavoriteIds(prev => [...prev, laptopId]);
    }
  };

  const removeFromFavorites = (laptopId: string) => {
    setFavoriteIds(prev => prev.filter(id => id !== laptopId));
  };

  const isFavorite = (laptopId: string) => {
    return favoriteIds.includes(laptopId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};