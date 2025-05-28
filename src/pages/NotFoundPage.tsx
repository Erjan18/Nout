import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Страница не найдена</h2>
        <p className="mt-6 text-gray-600">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
        <div className="mt-10">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Вернуться на главную</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;