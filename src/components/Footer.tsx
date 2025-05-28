import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-7 w-7 text-blue-500" />
              <span className="ml-2 text-xl font-bold">ЛаптопМаркет</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ваш надежный источник современных ноутбуков. Лучшие цены, широкий выбор и профессиональная консультация.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Игровые ноутбуки
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Ультрабуки
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Для работы
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Для учебы
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  Москва, ул. Примерная, д. 123
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <a href="tel:+79001234567" className="text-gray-400 hover:text-blue-500 transition-colors">
                  +7 (900) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:info@laptopmarket.ru" className="text-gray-400 hover:text-blue-500 transition-colors">
                  info@laptopmarket.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ЛаптопМаркет. Все права защищены.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                    Условия использования
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;