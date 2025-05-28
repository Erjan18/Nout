import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  linkTo: string;
  color: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: '1',
    title: 'Новые игровые ноутбуки',
    subtitle: 'Мощные процессоры и видеокарты для лучшего игрового опыта',
    image: 'https://hyperpc.ru/images/support/articles/the-best-gaming-laptops-in-2023-2024/the-best-gaming-notebook_webp.jpg',
    linkTo: '/catalog',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: '2',
    title: 'Ультрабуки 2025',
    subtitle: 'Легкие, тонкие, мощные - для работы и развлечений',
    image: 'https://www.dgl.ru/wp-content/uploads/2025/02/i.webp',
    linkTo: '/catalog',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: '3',
    title: 'Специальные предложения',
    subtitle: 'Скидки до 30% на ноутбуки ведущих брендов',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    linkTo: '/catalog',
    color: 'from-red-500 to-orange-600',
  },
];

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % bannerSlides.length;
    goToSlide(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + bannerSlides.length) % bannerSlides.length;
    goToSlide(newIndex);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative h-[70vh] md:h-[60vh] max-h-[600px] overflow-hidden">
      {/* Slides */}
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80 z-10`}></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
                  {slide.title}
                </h2>
                <p className="text-xl text-white mb-8 animate-fadeInUp animation-delay-200">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.linkTo}
                  className="inline-block bg-white text-gray-900 font-medium py-3 px-6 rounded-md 
                    hover:bg-gray-100 transition-colors duration-300 animate-fadeInUp animation-delay-400"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 
          text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 
          text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;