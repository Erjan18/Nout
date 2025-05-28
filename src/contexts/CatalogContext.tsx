import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { laptopsData } from '../data/laptops';

export interface Laptop {
  id: string;
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  processor: string;
  ram: number;
  storage: string;
  display: string;
  graphics: string;
  os: string;
  weight: string;
  color: string;
  purpose: string[];
  description: string;
  isNew: boolean;
  isPopular: boolean;
}

interface FilterOptions {
  brands: string[];
  priceRange: [number, number];
  ramOptions: number[];
  purposes: string[];
}

interface CatalogContextType {
  laptops: Laptop[];
  filteredLaptops: Laptop[];
  filters: {
    brands: string[];
    priceRange: [number, number];
    ram: number[];
    purposes: string[];
    search: string;
  };
  sortOption: string;
  filterOptions: FilterOptions;
  setFilters: (filters: any) => void;
  setSortOption: (option: string) => void;
  setSearchQuery: (query: string) => void;
  getLaptopById: (id: string) => Laptop | undefined;
  getSimilarLaptops: (id: string) => Laptop[];
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};

interface CatalogProviderProps {
  children: ReactNode;
}

export const CatalogProvider: React.FC<CatalogProviderProps> = ({ children }) => {
  const [laptops] = useState<Laptop[]>(laptopsData);
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>(laptopsData);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 300000],
    ram: [],
    purposes: [],
    search: '',
  });
  const [sortOption, setSortOption] = useState('popular');

  // Extract filter options from laptops data
  const filterOptions: FilterOptions = {
    brands: Array.from(new Set(laptops.map(laptop => laptop.brand))),
    priceRange: [
      Math.min(...laptops.map(laptop => laptop.price)),
      Math.max(...laptops.map(laptop => laptop.price))
    ],
    ramOptions: Array.from(new Set(laptops.map(laptop => laptop.ram))).sort((a, b) => a - b),
    purposes: Array.from(new Set(laptops.flatMap(laptop => laptop.purpose))),
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...laptops];

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(laptop => filters.brands.includes(laptop.brand));
    }

    // Apply price range filter
    result = result.filter(
      laptop => laptop.price >= filters.priceRange[0] && laptop.price <= filters.priceRange[1]
    );

    // Apply RAM filter
    if (filters.ram.length > 0) {
      result = result.filter(laptop => filters.ram.includes(laptop.ram));
    }

    // Apply purpose filter
    if (filters.purposes.length > 0) {
      result = result.filter(laptop => 
        laptop.purpose.some(p => filters.purposes.includes(p))
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        laptop =>
          laptop.brand.toLowerCase().includes(searchLower) ||
          laptop.model.toLowerCase().includes(searchLower) ||
          laptop.processor.toLowerCase().includes(searchLower) ||
          laptop.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1));
        break;
    }

    setFilteredLaptops(result);
  }, [laptops, filters, sortOption]);

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const getLaptopById = (id: string) => {
    return laptops.find(laptop => laptop.id === id);
  };

  const getSimilarLaptops = (id: string) => {
    const laptop = getLaptopById(id);
    if (!laptop) return [];

    return laptops
      .filter(l => l.id !== id && (
        l.brand === laptop.brand || 
        l.purpose.some(p => laptop.purpose.includes(p))
      ))
      .slice(0, 4);
  };

  const value = {
    laptops,
    filteredLaptops,
    filters,
    sortOption,
    filterOptions,
    setFilters,
    setSortOption,
    setSearchQuery,
    getLaptopById,
    getSimilarLaptops,
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};