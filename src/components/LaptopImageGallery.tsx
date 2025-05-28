import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LaptopImageGalleryProps {
  images: string[];
  altText: string;
}

const LaptopImageGallery: React.FC<LaptopImageGalleryProps> = ({ images, altText }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative bg-white rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center border border-gray-200">
        <img
          src={images[currentImageIndex]}
          alt={altText}
          className="max-h-full max-w-full object-contain p-4"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex overflow-x-auto space-x-2 pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <img
                src={image}
                alt={`${altText} thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaptopImageGallery;