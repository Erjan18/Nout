import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';
import LaptopCard from './LaptopCard';

interface FeaturedLaptopsProps {
  title: string;
  subtitle?: string;
  filter: (laptop: any) => boolean;
  limit?: number;
}

const FeaturedLaptops: React.FC<FeaturedLaptopsProps> = ({ 
  title, 
  subtitle, 
  filter, 
  limit = 4 
}) => {
  const { laptops } = useCatalog();
  const filteredLaptops = laptops.filter(filter).slice(0, limit);

  if (filteredLaptops.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLaptops.map(laptop => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/catalog" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
          >
            Смотреть все
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLaptops;