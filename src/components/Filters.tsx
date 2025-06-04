import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { useCatalog } from '../contexts/CatalogContext';

const Filters: React.FC = () => {
  const { filters, setFilters, filterOptions } = useCatalog();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    price: true,
    ram: true,
    purpose: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    setFilters({ ...filters, brands: updatedBrands });
  };

  const handleRamChange = (ram: number) => {
    const updatedRam = filters.ram.includes(ram)
      ? filters.ram.filter(r => r !== ram)
      : [...filters.ram, ram];
    
    setFilters({ ...filters, ram: updatedRam });
  };

  const handlePurposeChange = (purpose: string) => {
    const updatedPurposes = filters.purposes.includes(purpose)
      ? filters.purposes.filter(p => p !== purpose)
      : [...filters.purposes, purpose];
    
    setFilters({ ...filters, purposes: updatedPurposes });
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters({ ...filters, priceRange: value });
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      priceRange: [filterOptions.priceRange[0], filterOptions.priceRange[1]],
      ram: [],
      purposes: [],
      search: filters.search,
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.brands.length > 0 ||
      filters.ram.length > 0 ||
      filters.purposes.length > 0 ||
      filters.priceRange[0] !== filterOptions.priceRange[0] ||
      filters.priceRange[1] !== filterOptions.priceRange[1]
    );
  };

  // Translate purpose to Russian
  const purposeTranslations: { [key: string]: string } = {
    'gaming': 'Игровой',
    'business': 'Для работы',
    'student': 'Для учебы',
    'multimedia': 'Мультимедиа',
    'ultrabook': 'Ультрабук',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Mobile filter button */}
      <button 
        className="md:hidden w-full flex items-center justify-between p-4 bg-blue-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          <span>Фильтры</span>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter content */}
      <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Фильтры</h3>
          {hasActiveFilters() && (
            <button 
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Сбросить все
            </button>
          )}
        </div>

        {/* Brands */}
        <div className="border-b border-gray-200">
          <button 
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection('brands')}
          >
            <span className="font-medium">Производитель</span>
            {expandedSections.brands ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.brands && (
            <div className="p-4 pt-0">
              {filterOptions.brands.map(brand => (
                <div key={brand} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-b border-gray-200">
          <button 
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection('price')}
          >
            <span className="font-medium">Цена</span>
            {expandedSections.price ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.price && (
            <div className="p-4 pt-0">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">
                  От: {filters.priceRange[0].toLocaleString()} сом
                </span>
                <span className="text-sm text-gray-600">
                  До: {filters.priceRange[1].toLocaleString()} сом
                </span>
              </div>
              
              <div className="flex space-x-4 mb-4">
                <input
                  type="range"
                  min={filterOptions.priceRange[0]}
                  max={filterOptions.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) => 
                    handlePriceChange([
                      Number(e.target.value), 
                      Math.max(Number(e.target.value), filters.priceRange[1])
                    ])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min={filterOptions.priceRange[0]}
                  max={filterOptions.priceRange[1]}
                  value={filters.priceRange[1]}
                  onChange={(e) => 
                    handlePriceChange([
                      Math.min(filters.priceRange[0], Number(e.target.value)), 
                      Number(e.target.value)
                    ])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="number"
                  min={filterOptions.priceRange[0]}
                  max={filters.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) => 
                    handlePriceChange([
                      Number(e.target.value), 
                      Math.max(Number(e.target.value), filters.priceRange[1])
                    ])
                  }
                  className="w-1/2 px-2 py-1 border rounded text-sm"
                />
                <input
                  type="number"
                  min={filters.priceRange[0]}
                  max={filterOptions.priceRange[1]}
                  value={filters.priceRange[1]}
                  onChange={(e) => 
                    handlePriceChange([
                      Math.min(filters.priceRange[0], Number(e.target.value)), 
                      Number(e.target.value)
                    ])
                  }
                  className="w-1/2 px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* RAM */}
        <div className="border-b border-gray-200">
          <button 
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection('ram')}
          >
            <span className="font-medium">Оперативная память</span>
            {expandedSections.ram ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.ram && (
            <div className="p-4 pt-0">
              {filterOptions.ramOptions.map(ram => (
                <div key={ram} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`ram-${ram}`}
                    checked={filters.ram.includes(ram)}
                    onChange={() => handleRamChange(ram)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`ram-${ram}`} className="ml-2 text-gray-700">
                    {ram} ГБ
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Purpose */}
        <div className="border-b border-gray-200">
          <button 
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection('purpose')}
          >
            <span className="font-medium">Назначение</span>
            {expandedSections.purpose ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.purpose && (
            <div className="p-4 pt-0">
              {filterOptions.purposes.map(purpose => (
                <div key={purpose} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`purpose-${purpose}`}
                    checked={filters.purposes.includes(purpose)}
                    onChange={() => handlePurposeChange(purpose)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`purpose-${purpose}`} className="ml-2 text-gray-700">
                    {purposeTranslations[purpose] || purpose}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;