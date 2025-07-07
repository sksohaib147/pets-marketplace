import React, { useState } from 'react';
import { FaShippingFast, FaHeadset, FaPaw, FaStar, FaChevronLeft, FaChevronRight, FaDog, FaCat, FaBone, FaGamepad, FaHome, FaChevronDown, FaUserCircle } from 'react-icons/fa';
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

// Banner images (carousel)
const banners = [
  {
    img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80',
    alt: 'Voucher Banner',
    text: 'Up to 10% off Voucher',
    sub: 'Shop now >',
  },
  {
    img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
    alt: 'Promo Banner',
    text: 'Best Deals for Your Pets',
    sub: 'Discover >',
  },
];

// 1. Expand Flash Sales
const flashSales = [
  { id: 1, name: 'Profeed+ 15KG', price: 45.99, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.8, reviews: 1052 },
  { id: 2, name: 'Cat Scratcher', price: 19.99, image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: true, rating: 4.7, reviews: 711 },
  { id: 3, name: 'Dog Food 5KG', price: 24.99, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.6, reviews: 891 },
  { id: 4, name: 'Cat Litter', price: 12.99, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.5, reviews: 496 },
  { id: 5, name: 'Cat Box', price: 29.99, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.4, reviews: 320 },
  { id: 6, name: 'Dog Chew Toy', price: 9.99, image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.5, reviews: 210 },
  { id: 7, name: 'Cat Scratcher', price: 14.99, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.7, reviews: 180 },
  { id: 8, name: 'Rabbit Hay Feeder', price: 12.99, image: 'https://images.unsplash.com/photo-1507146426996-ef05306b0aed?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.8, reviews: 320 },
  { id: 9, name: 'Interactive Ball', price: 19.99, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.6, reviews: 150 },
  { id: 10, name: 'Pet Carrier', price: 29.99, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.9, reviews: 410 },
  { id: 11, name: 'Dog Leash', price: 7.99, image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.4, reviews: 120 },
  { id: 12, name: 'Cat Tunnel', price: 11.99, image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.8, reviews: 210 },
  { id: 13, name: 'Bird Cage', price: 39.99, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', sale: true, soldOut: false, rating: 4.7, reviews: 180 },
];

// 2. Expand Best Selling Products
const bestSellingProducts = [
  { id: 1, name: 'Luxury Dog Bed', price: 49.99, image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 102 },
  { id: 2, name: 'Cat Tower', price: 59.99, image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 98 },
  { id: 3, name: 'Rabbit Hutch', price: 89.99, image: 'https://images.unsplash.com/photo-1507146426996-ef05306b0aed?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 87 },
  { id: 4, name: 'Pet Stroller', price: 79.99, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 110 },
  { id: 5, name: 'Dog Raincoat', price: 24.99, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 95 },
  { id: 6, name: 'Cat Backpack', price: 34.99, image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 120 },
];

// 3. Explore Our Products grid
const exploreProducts = [
  { id: 1, name: 'Pet Camera', price: 99.99, image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 210 },
  { id: 2, name: 'Automatic Feeder', price: 59.99, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 180 },
  { id: 3, name: 'Pet Water Fountain', price: 39.99, image: 'https://images.unsplash.com/photo-1507146426996-ef05306b0aed?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 320 },
  { id: 4, name: 'Dog Sweater', price: 19.99, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 150 },
  { id: 5, name: 'Cat Window Perch', price: 29.99, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 410 },
  { id: 6, name: 'Pet GPS Tracker', price: 49.99, image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 120 },
  { id: 7, name: 'Dog Boots', price: 24.99, image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 210 },
  { id: 8, name: 'Cat Puzzle Toy', price: 14.99, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 180 },
];

// 4. New Arrivals
const newArrivals = [
  { id: 1, name: 'Smart Litter Box', price: 129.99, image: 'https://images.unsplash.com/photo-1507146426996-ef05306b0aed?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 50 },
  { id: 2, name: 'Pet Air Purifier', price: 89.99, image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 40 },
  { id: 3, name: 'LED Collar', price: 19.99, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 60 },
  { id: 4, name: 'Pet Cooling Mat', price: 34.99, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 70 },
];

function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const handlePrev = () => setIndex((i) => (i === 0 ? banners.length - 1 : i - 1));
  const handleNext = () => setIndex((i) => (i === banners.length - 1 ? 0 : i + 1));
  return (
    <div className="relative w-full min-h-[220px] mb-6">
      <div className="flex items-center h-[220px] border-2 border-primary rounded-xl overflow-hidden bg-white">
        <img src={banners[index].img} alt={banners[index].alt} className="w-[260px] h-[220px] object-cover flex-shrink-0" />
        <div className="pl-8">
          <h2 className="text-2xl font-bold mb-2">{banners[index].text}</h2>
          <p className="text-primary font-medium">{banners[index].sub}</p>
        </div>
      </div>
      <button onClick={handlePrev} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow p-1 rounded-full"><FaChevronLeft /></button>
      <button onClick={handleNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow p-1 rounded-full"><FaChevronRight /></button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'}`}></div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="relative w-48 mx-2 bg-white rounded-xl shadow hover:-translate-y-2 transition-transform">
      <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded-t-xl" />
      {product.sale && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
      )}
      {product.soldOut && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg z-10 rounded-xl">Sold Out</div>
      )}
      <div className="p-3 pb-2">
        <div className="font-semibold truncate">{product.name}</div>
        <div className="text-gray-500 text-sm mb-1">${product.price}</div>
        <div className="flex items-center gap-1 text-yellow-400 text-xs">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(product.rating) ? '' : 'text-gray-300'} />
          ))}
          <span className="text-gray-400 ml-1">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}

function PetCard({ pet }) {
  if (!pet.name) {
    return <div className="w-48 h-56 mx-2 bg-gray-100 rounded-xl" />;
  }
  return (
    <div className="w-48 mx-2 bg-white rounded-xl shadow">
      <img src={pet.image} alt={pet.name} className="h-32 w-full object-cover rounded-t-xl" />
      <div className="p-3 pb-2">
        <div className="font-semibold truncate">{pet.name}</div>
        <div className="text-gray-500 text-sm mb-1">${pet.price}</div>
        <div className="flex items-center gap-1 text-yellow-400 text-xs">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(pet.rating || 0) ? '' : 'text-gray-300'} />
          ))}
          <span className="text-gray-400 ml-1">({pet.reviews || 0})</span>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        {/* User Avatar/Profile at the top right */}
        <div className="flex justify-end items-center mb-2">
          <button className="flex items-center space-x-2 focus:outline-none">
            <FaUserCircle className="text-3xl text-gray-400 hover:text-primary" />
            <span className="hidden md:inline text-gray-700 font-medium">Profile</span>
          </button>
        </div>
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
            {/* Prominent Banner with CTA */}
            <div className="w-full flex justify-center mb-6">
              <div className="w-full max-w-4xl flex bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80" alt="Voucher Banner" className="w-48 h-48 object-cover flex-shrink-0" />
                <div className="flex flex-col justify-center px-4 py-4 flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">Up to 10% OFF Voucher</h2>
                  <p className="text-primary font-medium text-lg mb-4 drop-shadow">Shop now &gt;</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg shadow transition">Get Voucher</button>
                </div>
              </div>
            </div>

            {/* Flash Sales Section */}
            <section className="mt-8">
              <div className="flex items-center mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">{t.today}</span>
                <h4 className="text-xl font-bold">{t.flashSales}</h4>
              </div>
              <hr className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashSales.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
            {/* Best Selling Pets Section */}
            <section className="mt-6">
              <div className="flex items-center mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">{t.topRated}</span>
                <h4 className="text-xl font-bold">{t.bestSellingPets}</h4>
                <div className="flex-1" />
                <button className="border border-red-500 text-red-500 font-bold px-4 py-2 rounded hover:bg-red-50 transition">{t.viewAll}</button>
              </div>
              <hr className="mb-4" />
              <div className="flex overflow-x-auto pb-2">
                {bestSellingProducts.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </section>
            {/* Promotional/Ad Banner */}
            <section className="my-6">
              <div className="rounded-xl bg-black flex items-center justify-between p-8 shadow-lg">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Enhance Your Pet's Life</h3>
                  <p className="text-gray-300 mb-4">Discover the latest tech and comfort for your furry friends.</p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg shadow transition">Shop Now</button>
                </div>
                <img src="https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=300&q=80" alt="Promo" className="h-32 w-32 object-cover rounded-xl ml-8" />
              </div>
            </section>

            {/* Explore Our Products */}
            <section className="my-6">
              <h4 className="text-xl font-bold mb-4">Explore Our Products</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {exploreProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                    <img src={product.image} alt={product.name} className="h-24 w-24 object-cover rounded mb-2" />
                    <div className="font-semibold mb-1">{product.name}</div>
                    <div className="text-gray-500 text-sm mb-1">${product.price}</div>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(product.rating) ? '' : 'text-gray-300'} />
                      ))}
                      <span className="text-gray-400 ml-1">({product.reviews})</span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm">View</button>
                  </div>
                ))}
              </div>
            </section>

            {/* New Arrivals */}
            <section className="my-6">
              <h4 className="text-xl font-bold mb-4">New Arrivals</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <img src={product.image} alt={product.name} className="h-32 w-32 object-cover rounded mb-2" />
                    <div className="font-semibold mb-1">{product.name}</div>
                    <div className="text-gray-500 text-sm mb-1">${product.price}</div>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(product.rating) ? '' : 'text-gray-300'} />
                      ))}
                      <span className="text-gray-400 ml-1">({product.reviews})</span>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm">Shop Now</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Newsletter Signup */}
            <section className="my-6">
              <div className="bg-blue-50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h4 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h4>
                  <p className="text-gray-600">Get the latest deals and updates straight to your inbox.</p>
                </div>
                <form className="flex w-full md:w-auto">
                  <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none" />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg font-bold">Subscribe</button>
                </form>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home; 