import React, { useState } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import LaptopCard from '../components/LaptopCard';
import Filters from '../components/Filters';
import { SlidersHorizontal, X } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const { filteredLaptops, setSortOption, sortOption } = useCatalog();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-6 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Каталог ноутбуков</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Filters />
          </aside>

          {/* Mobile Filters Button */}
          <button
            className="lg:hidden flex items-center justify-center bg-blue-600 text-white p-3 rounded-lg mb-4"
            onClick={toggleMobileFilters}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            <span>Фильтры</span>
          </button>

          {/* Mobile Filters Overlay */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={toggleMobileFilters}>
              <div 
                className="absolute right-0 top-0 h-full w-80 max-w-full bg-white overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Фильтры</h3>
                  <button 
                    onClick={toggleMobileFilters}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <Filters />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-grow">
            {/* Sorting and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                Найдено товаров: <span className="font-semibold">{filteredLaptops.length}</span>
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600">Сортировать:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">По цене (сначала дешевые)</option>
                  <option value="price-desc">По цене (сначала дорогие)</option>
                  <option value="newest">По новизне</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            {filteredLaptops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLaptops.map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-xl text-gray-600 mb-4">По вашему запросу ничего не найдено</p>
                <p className="text-gray-500">Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;