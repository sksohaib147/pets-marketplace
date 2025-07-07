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

const dogFoodProducts = [
  {
    id: 1,
    name: 'Profeed+ Adult Dog Food 15KG',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80',
    description: 'High-protein dry food for adult dogs. Supports healthy skin and coat.',
    sale: true,
    soldOut: false,
    rating: 4.8,
    reviews: 1052,
  },
  {
    id: 2,
    name: 'Royal Canin Puppy Food 3KG',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80',
    description: 'Special formula for puppies. Supports growth and immunity.',
    sale: false,
    soldOut: false,
    rating: 4.7,
    reviews: 800,
  },
  {
    id: 3,
    name: 'Pedigree Gravy Pouches (12 Pack)',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80',
    description: 'Tasty wet food pouches for all breeds. Rich in vitamins and minerals.',
    sale: true,
    soldOut: false,
    rating: 4.6,
    reviews: 650,
  },
  {
    id: 4,
    name: 'Hill\'s Science Diet Sensitive Stomach',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b0aed?auto=format&fit=crop&w=400&q=80',
    description: 'Easily digestible food for dogs with sensitive stomachs.',
    sale: false,
    soldOut: false,
    rating: 4.9,
    reviews: 420,
  },
  {
    id: 5,
    name: 'Purina ONE SmartBlend Lamb & Rice',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    description: 'Real lamb as the #1 ingredient. Supports strong muscles and heart.',
    sale: false,
    soldOut: false,
    rating: 4.5,
    reviews: 390,
  },
  {
    id: 6,
    name: 'Blue Buffalo Wilderness Salmon Recipe',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80',
    description: 'Grain-free, high-protein food with real salmon for active dogs.',
    sale: true,
    soldOut: false,
    rating: 4.8,
    reviews: 510,
  },
  {
    id: 7,
    name: 'Taste of the Wild High Prairie',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80',
    description: 'Roasted bison and venison dry dog food. Grain-free and highly digestible.',
    sale: false,
    soldOut: false,
    rating: 4.9,
    reviews: 670,
  },
  {
    id: 8,
    name: 'Wellness CORE RawRev',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    description: 'Protein-rich, grain-free dry food with freeze-dried turkey bites.',
    sale: true,
    soldOut: false,
    rating: 4.7,
    reviews: 320,
  },
  {
    id: 9,
    name: 'Nutro Ultra Small Breed Adult',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    description: 'Superfood blend for small breed adult dogs. Chicken, lamb, and salmon.',
    sale: false,
    soldOut: false,
    rating: 4.6,
    reviews: 210,
  },
  {
    id: 10,
    name: 'Cesar Gourmet Wet Dog Food Variety Pack',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80',
    description: 'Delicious wet food trays for small dogs. No grains or fillers.',
    sale: false,
    soldOut: false,
    rating: 4.8,
    reviews: 410,
  },
];

const DogFoodDropdown = () => {
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
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group bg-red-50 border-red-200`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-red-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors text-red-500">{t.dogsFood}</span>
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
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.rabbitFood}</span>
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
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Dog Food Products</h2>
            <p className="mb-6 text-gray-600 max-w-2xl">Discover our wide selection of premium dog food for all breeds and life stages. From grain-free and high-protein formulas to wet and dry options, we have the perfect meal for your furry friend's health and happiness.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dogFoodProducts.map(product => (
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

export default DogFoodDropdown; 