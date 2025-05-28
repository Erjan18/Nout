import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import LaptopCard from '../components/LaptopCard';
import { User, Heart, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { favorites } = useFavorites();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
                    <p className="text-gray-600 text-sm">{currentUser?.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <ul>
                  <li>
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 flex items-center text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      <span>Выйти</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    <h2 className="text-xl font-bold">Избранное</h2>
                  </div>

                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favorites.map(laptop => (
                        <LaptopCard key={laptop.id} laptop={laptop} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <p className="text-gray-600 mb-4">У вас пока нет избранных товаров</p>
                      <Link 
                        to="/catalog" 
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Перейти в каталог
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;