import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, Menu, X, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCatalog } from '../contexts/CatalogContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { setSearchQuery } = useCatalog();
  const { favorites } = useFavorites();
  const { totalItems: cartItemsCount } = useCart();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    navigate('/catalog');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-7 w-7 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">ЛаптопМаркет</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Каталог
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Поиск ноутбуков..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button type="submit" className="sr-only">
                Поиск
              </button>
            </form>
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/profile" 
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title={isAuthenticated ? currentUser?.name : "Личный кабинет"}
            >
              <User className="h-6 w-6" />
              {isAuthenticated && (
                <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
              )}
            </Link>
            <Link 
              to="/profile" 
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Избранное"
            >
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Корзина"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            {/* Search Bar - Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск ноутбуков..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button type="submit" className="sr-only">
                Поиск
              </button>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/catalog" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Каталог
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                <span>
                  {isAuthenticated ? `Личный кабинет (${currentUser?.name})` : 'Войти'}
                </span>
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5 mr-2" />
                <span>Избранное {favorites.length > 0 && `(${favorites.length})`}</span>
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Корзина {cartItemsCount > 0 && `(${cartItemsCount})`}</span>
              </Link>
              {isAuthenticated && (
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-red-600 hover:text-red-700 transition-colors py-2"
                >
                  Выйти
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;