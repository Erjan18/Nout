import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';

interface CategoryCardProps {
  title: string;
  image: string;
  type: 'brand' | 'purpose';
  value: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, type, value }) => {
  const { setFilters } = useCatalog();

  const handleClick = () => {
    if (type === 'brand') {
      setFilters(prev => ({ ...prev, brands: [value] }));
    } else if (type === 'purpose') {
      setFilters(prev => ({ ...prev, purposes: [value] }));
    }
  };

  return (
    <Link to="/catalog" onClick={handleClick}>
      <div className="relative rounded-lg overflow-hidden group h-40 shadow-md">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center p-4">
          <h3 className="text-white text-center text-xl font-semibold drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;