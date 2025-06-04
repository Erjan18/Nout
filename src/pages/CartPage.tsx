import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartProducts, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-8">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link
              to="/catalog"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartProducts.map(product => (
                <div
                  key={product.id}
                  className="p-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.model}`}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="ml-6 flex-grow">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {product.brand} {product.model}
                      </Link>
                      <div className="mt-1 text-sm text-gray-500">
                        {product.processor} • {product.ram} ГБ RAM • {product.storage}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{product.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">
                            {(product.price * product.quantity).toLocaleString()} сом
                          </span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Сумма заказа</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({cartProducts.length})</span>
                  <span>{totalPrice.toLocaleString()} сом</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Итого</span>
                    <span>{totalPrice.toLocaleString()} сом</span>
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 
                  transition-colors font-medium"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage