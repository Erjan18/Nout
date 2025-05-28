import React from 'react';
import Banner from '../components/Banner';
import FeaturedLaptops from '../components/FeaturedLaptops';
import CategoryCard from '../components/CategoryCard';

const HomePage: React.FC = () => {
  // Brand categories
  const brandCategories = [
    {
      id: 'apple',
      title: 'Apple',
      image: 'https://asiastore.kg/image/cache/catalog/1newpage/apple/macbookprom3/spaceblack/product-small-picturecb16-450x450.jpg',
      value: 'Apple',
    },
    {
      id: 'lenovo',
      title: 'Lenovo',
      image: 'https://exceldisc.com/_next/image?url=https%3A%2F%2Fapiv2.exceldisc.com%2Fmedia%2F44236%2Flenovo-legion-pro-5-16irx8-gaming-laptop-13th-gen-i9-13900hx.png&w=3840&q=75',
      value: 'Lenovo',
    },
    {
      id: 'dell',
      title: 'Dell',
      image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      value: 'Dell',
    },
    {
      id: 'hp',
      title: 'HP',
      image: 'https://images.pexels.com/photos/669228/pexels-photo-669228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      value: 'HP',
    },
  ];

  // Purpose categories
  const purposeCategories = [
    {
      id: 'gaming',
      title: 'Игровые',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      value: 'gaming',
    },
    {
      id: 'business',
      title: 'Для работы',
      image: 'https://images.pexels.com/photos/6893835/pexels-photo-6893835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      value: 'business',
    },
    {
      id: 'student',
      title: 'Для учебы',
      image: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      value: 'student',
    },
    {
      id: 'ultrabook',
      title: 'Ультрабуки',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      value: 'ultrabook',
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <Banner />

      {/* Welcome Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Добро пожаловать в ЛаптопМаркет</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8">
            Ваш надежный источник современных ноутбуков. У нас вы найдете широкий выбор моделей 
            от ведущих производителей, подходящих для любых задач: от работы и учебы до игр и творчества.
          </p>
          <div className="flex justify-center">
            <a 
              href="/catalog" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md 
                transition-colors duration-300 inline-flex items-center"
            >
              Перейти в каталог
            </a>
          </div>
        </div>
      </section>

      {/* Featured New Laptops */}
      <FeaturedLaptops
        title="Новинки"
        subtitle="Ознакомьтесь с последними моделями ноутбуков"
        filter={(laptop) => laptop.isNew}
      />

      {/* Categories by Brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Популярные бренды</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandCategories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                image={category.image}
                type="brand"
                value={category.value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Discounted Laptops */}
      <FeaturedLaptops
        title="Специальные предложения"
        subtitle="Успейте приобрести по выгодной цене"
        filter={(laptop) => laptop.oldPrice !== undefined}
      />

      {/* Categories by Purpose */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Ноутбуки по назначению</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {purposeCategories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                image={category.image}
                type="purpose"
                value={category.value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Popular Laptops */}
      <FeaturedLaptops
        title="Популярные модели"
        subtitle="Самые востребованные ноутбуки этого года"
        filter={(laptop) => laptop.isPopular}
      />

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Не можете определиться с выбором?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Наши специалисты помогут подобрать ноутбук, который идеально подойдет для ваших задач.
            Свяжитесь с нами по телефону или электронной почте.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="tel:+79001234567" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md 
                transition-colors duration-300 inline-flex items-center justify-center"
            >
              Позвонить
            </a>
            <a 
              href="mailto:info@laptopmarket.ru" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-8 
                rounded-md transition-colors duration-300 inline-flex items-center justify-center"
            >
              Написать
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;