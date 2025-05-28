import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import LaptopImageGallery from '../components/LaptopImageGallery';
import LaptopCard from '../components/LaptopCard';
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getLaptopById, getSimilarLaptops } = useCatalog();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const laptop = getLaptopById(id || '');
  const similarLaptops = getSimilarLaptops(id || '');

  if (!laptop) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
        <p className="text-gray-600 mb-8">Запрашиваемый товар не существует или был удален</p>
        <Link 
          to="/catalog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(laptop.id);

  const toggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(laptop.id);
    } else {
      addToFavorites(laptop.id);
    }
  };

  const handleAddToCart = () => {
    addToCart(laptop.id);
  };

  // Purpose translation
  const purposeTranslations: { [key: string]: string } = {
    'gaming': 'Игровой',
    'business': 'Для работы',
    'student': 'Для учебы',
    'multimedia': 'Мультимедиа',
    'ultrabook': 'Ультрабук',
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Главная</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/catalog" className="text-gray-500 hover:text-blue-600">Каталог</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium truncate">
              {laptop.brand} {laptop.model}
            </span>
          </div>
        </div>

        {/* Back Button - Mobile */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 md:hidden"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Назад</span>
        </button>

        {/* Product Overview */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <LaptopImageGallery 
                images={laptop.images} 
                altText={`${laptop.brand} ${laptop.model}`} 
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {laptop.brand} {laptop.model}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {laptop.isNew && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Новинка
                  </span>
                )}
                {laptop.isPopular && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Популярный
                  </span>
                )}
                {laptop.purpose.map(purpose => (
                  <span 
                    key={purpose}
                    className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                  >
                    {purposeTranslations[purpose] || purpose}
                  </span>
                ))}
              </div>

              {/* Short Specs */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Краткие характеристики:</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex">
                    <span className="text-gray-600 w-32">Процессор:</span> 
                    <span className="font-medium">{laptop.processor}</span>
                  </li>
                  <li className="flex">
                    <span className="text-gray-600 w-32">Оперативная память:</span> 
                    <span className="font-medium">{laptop.ram} ГБ</span>
                  </li>
                  <li className="flex">
                    <span className="text-gray-600 w-32">Хранилище:</span> 
                    <span className="font-medium">{laptop.storage}</span>
                  </li>
                  <li className="flex">
                    <span className="text-gray-600 w-32">Видеокарта:</span> 
                    <span className="font-medium">{laptop.graphics}</span>
                  </li>
                  <li className="flex">
                    <span className="text-gray-600 w-32">Дисплей:</span> 
                    <span className="font-medium">{laptop.display}</span>
                  </li>
                </ul>
              </div>

              {/* Price and Actions */}
              <div className="mt-auto space-y-4">
                <div className="flex items-end gap-2">
                  {laptop.oldPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      {laptop.oldPrice.toLocaleString()} ₽
                    </span>
                  )}
                  <span className="text-3xl font-bold text-blue-600">
                    {laptop.price.toLocaleString()} ₽
                  </span>
                </div>

                {/* Buy and Favorite Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 
                      transition-colors duration-300 flex items-center justify-center text-lg font-medium"
                  >
                    <ShoppingCart className="h-6 w-6 mr-2" />
                    Купить
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className={`px-6 py-3 rounded-md border-2 
                      ${isFav 
                        ? 'bg-red-50 border-red-500 text-red-600' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'} 
                      transition-colors duration-300 flex items-center`}
                  >
                    <Heart className={`h-6 w-6 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description and Specifications */}
          <div className="border-t border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Описание</h2>
              <div className="prose max-w-none text-gray-700">
                <p>{laptop.description}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Характеристики</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Основные</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Бренд</td>
                        <td className="py-2 font-medium">{laptop.brand}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Модель</td>
                        <td className="py-2 font-medium">{laptop.model}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Цвет</td>
                        <td className="py-2 font-medium">{laptop.color}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Вес</td>
                        <td className="py-2 font-medium">{laptop.weight}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">ОС</td>
                        <td className="py-2 font-medium">{laptop.os}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Технические</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Процессор</td>
                        <td className="py-2 font-medium">{laptop.processor}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Оперативная память</td>
                        <td className="py-2 font-medium">{laptop.ram} ГБ</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Хранилище</td>
                        <td className="py-2 font-medium">{laptop.storage}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Видеокарта</td>
                        <td className="py-2 font-medium">{laptop.graphics}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-600">Дисплей</td>
                        <td className="py-2 font-medium">{laptop.display}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarLaptops.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;