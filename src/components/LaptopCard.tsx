import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Laptop } from '../contexts/CatalogContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

interface LaptopCardProps {
  laptop: Laptop;
}

const LaptopCard: React.FC<LaptopCardProps> = ({ laptop }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const isFav = isFavorite(laptop.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFromFavorites(laptop.id);
    } else {
      addToFavorites(laptop.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(laptop.id);
  };

  return (
    <Link to={`/product/${laptop.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        {/* Image container with relative positioning for badges */}
        <div className="relative pt-[56.25%] bg-gray-100 overflow-hidden">
          <img
            src={laptop.image}
            alt={`${laptop.brand} ${laptop.model}`}
            className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full 
              ${isFav 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-500 hover:bg-gray-100'} 
              transition-all duration-300 shadow-sm`}
          >
            <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
          </button>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {laptop.isNew && (
              <span className="bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded">
                Новинка
              </span>
            )}
            {laptop.oldPrice && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                Скидка {Math.round((1 - laptop.price / laptop.oldPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
            {laptop.brand} {laptop.model}
          </h3>
          
          <div className="mt-1 mb-3 text-sm text-gray-600 flex-grow">
            <ul className="space-y-1">
              <li className="truncate">Процессор: {laptop.processor}</li>
              <li className="truncate">Оперативная память: {laptop.ram} ГБ</li>
              <li className="truncate">Хранилище: {laptop.storage}</li>
              <li className="truncate">Видеокарта: {laptop.graphics}</li>
            </ul>
          </div>
          
          <div className="mt-auto space-y-3">
            <div>
              {laptop.oldPrice && (
                <span className="text-gray-500 line-through text-sm mr-2">
                  {laptop.oldPrice.toLocaleString()} ₽
                </span>
              )}
              <span className="text-lg font-bold text-blue-600">
                {laptop.price.toLocaleString()} ₽
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                transition-colors duration-300 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              В корзину
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LaptopCard;