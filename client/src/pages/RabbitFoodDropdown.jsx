import React from 'react';
import { FaStar, FaArrowLeft, FaDog, FaCat, FaBone, FaGamepad, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage, translations } from '../contexts/LanguageContext';

// Sidebar categories
const categories = [
  {
    name: 'Dogs Food',
    icon: <FaDog className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Cat Food',
    icon: <FaCat className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Rabbit Food',
    icon: <FaBone className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Toys',
    icon: <FaGamepad className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Belts and Cages',
    icon: <FaHome className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
];

const rabbitFoodProducts = [
  {
    id: 1,
    name: 'Oxbow Essentials Adult Rabbit Food',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b0aed?auto=format&fit=crop&w=400&q=80',
    description: 'Timothy hay-based pellets for adult rabbits. Supports digestive health.',
    sale: true,
    soldOut: false,
    rating: 4.8,
    reviews: 320,
  },
  {
    id: 2,
    name: 'Kaytee Fiesta Rabbit Food',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    description: 'Nutritionally fortified gourmet food with fruits and veggies.',
    sale: false,
    soldOut: false,
    rating: 4.6,
    reviews: 210,
  },
  {
    id: 3,
    name: 'Small Pet Select Timothy Hay',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    description: 'Premium hand-selected timothy hay for daily feeding.',
    sale: true,
    soldOut: false,
    rating: 4.9,
    reviews: 410,
  },
  {
    id: 4,
    name: 'Vitakraft Menu Vitamin Fortified Rabbit Food',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    description: 'Blend of grains, fruits, and vegetables for a balanced diet.',
    sale: false,
    soldOut: false,
    rating: 4.5,
    reviews: 150,
  },
  {
    id: 5,
    name: 'Supreme Science Selective Rabbit Food',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80',
    description: 'High-fiber pellets to support dental and digestive health.',
    sale: true,
    soldOut: false,
    rating: 4.7,
    reviews: 210,
  },
  {
    id: 6,
    name: 'Mazuri Timothy-Based Rabbit Diet',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80',
    description: 'Complete nutrition for rabbits of all ages. Timothy hay-based.',
    sale: false,
    soldOut: false,
    rating: 4.8,
    reviews: 180,
  },
  {
    id: 7,
    name: 'Wild Harvest Advanced Nutrition Diet',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80',
    description: 'Enriched with vitamins and minerals for healthy rabbits.',
    sale: false,
    soldOut: false,
    rating: 4.6,
    reviews: 120,
  },
  {
    id: 8,
    name: 'Kaytee Timothy Hay Plus Carrots',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b0aed?auto=format&fit=crop&w=400&q=80',
    description: 'Timothy hay with dried carrots for added variety and nutrition.',
    sale: true,
    soldOut: false,
    rating: 4.7,
    reviews: 140,
  },
  {
    id: 9,
    name: 'Oxbow Garden Select Adult Rabbit Food',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    description: 'Garden-inspired blend with no artificial preservatives.',
    sale: false,
    soldOut: false,
    rating: 4.8,
    reviews: 160,
  },
  {
    id: 10,
    name: 'Sunseed Vita Prima Sunscription Rabbit Food',
    price: 13.49,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    description: 'Wholesome grains, fruits, and vegetables for daily feeding.',
    sale: false,
    soldOut: false,
    rating: 4.5,
    reviews: 110,
  },
];

const RabbitFoodDropdown = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
            <div className="relative mb-8">
              <h3 className="text-2xl font-bold text-gray-800 inline-block">
                {t.categories}
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 rounded-full"></div>
              </h3>
            </div>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  {cat.name === 'Dogs Food' && (
                    <Link
                      to="/dog-food"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.dogsFood}</span>
                      </div>
                    </Link>
                  )}
                  {cat.name === 'Cat Food' && (
                    <Link
                      to="/cat-food"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.catFood}</span>
                      </div>
                    </Link>
                  )}
                  {cat.name === 'Rabbit Food' && (
                    <Link
                      to="/rabbit-food"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group bg-red-50 border-red-200`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-red-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors text-red-500">{t.rabbitFood}</span>
                      </div>
                    </Link>
                  )}
                  {cat.name === 'Toys' && (
                    <Link
                      to="/toys"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.toys}</span>
                      </div>
                    </Link>
                  )}
                  {cat.name === 'Belts and Cages' && (
                    <Link
                      to="/belts-and-cages"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.beltsAndCages}</span>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-2">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-red-500 font-semibold text-lg mb-4">
                <FaArrowLeft className="mr-2" /> Back to Home
              </Link>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Rabbit Food Products</h2>
            <p className="mb-6 text-gray-600 max-w-2xl">Give your rabbit the best nutrition with our range of premium rabbit food. Choose from timothy hay, high-fiber pellets, and vitamin-rich blends for a healthy, happy bunny.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rabbitFoodProducts.map(product => (
                <div key={product.id} className="relative bg-white rounded-xl shadow p-2 flex flex-col">
                  {product.sale && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                  )}
                  {product.soldOut && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg z-10 rounded-xl">Sold Out</div>
                  )}
                  <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded-t-xl" />
                  <div className="p-3 pb-2">
                    <div className="font-semibold truncate">{product.name}</div>
                    <div className="text-gray-500 text-sm mb-1">${product.price}</div>
                    <div className="text-xs text-gray-600 mb-2 min-h-[40px]">{product.description}</div>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(product.rating) ? '' : 'text-gray-300'} />
                      ))}
                      <span className="text-gray-400 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RabbitFoodDropdown; 