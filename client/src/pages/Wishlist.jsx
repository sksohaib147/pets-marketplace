import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaEye } from 'react-icons/fa';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { formatUSD, formatPKR } from '../utils/currency';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item, item.type || 'product');
    removeFromWishlist(item._id);
  };

  const handleRemoveItem = (itemId) => {
    removeFromWishlist(itemId);
  };

  // Helper function to format price based on item type
  const formatItemPrice = (item) => {
    if (item.priceUSD || item.originalPriceUSD) {
      return formatUSD(item.priceUSD || item.price);
    }
    return formatPKR(item.pricePKR || item.price);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl text-gray-400 mb-4">💝</div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Start adding items you love to your wishlist!</p>
            <div className="space-x-4">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
              >
                Browse Products
              </Link>
              <Link
                to="/pets"
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 inline-block"
              >
                Browse Pets
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={item.images?.[0] || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Type Badge */}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold text-white ${
                  item.type === 'pet' ? 'bg-purple-500' : 'bg-blue-500'
                }`}>
                  {item.type === 'pet' ? 'Pet' : 'Product'}
                </div>

                {/* Status Badge */}
                {item.status && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold text-white ${
                    item.status === 'available' ? 'bg-green-500' : 
                    item.status === 'sold' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}>
                    {item.status}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-red-600">
                    {formatItemPrice(item)}
                  </span>
                  {item.originalPrice && item.originalPrice > (item.priceUSD || item.price) && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatItemPrice({ ...item, price: item.originalPrice })}
                    </span>
                  )}
                </div>

                {/* Item Details */}
                <div className="space-y-1 mb-3">
                  {item.category && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span> {item.category}
                    </p>
                  )}
                  {item.species && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Species:</span> {item.species}
                    </p>
                  )}
                  {item.breed && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Breed:</span> {item.breed}
                    </p>
                  )}
                  {item.location && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {item.location}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/${item.type === 'pet' ? 'pets' : 'products'}/${item.slug || item._id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FaEye className="text-sm" />
                    View
                  </Link>
                  
                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={item.status === 'sold' || (item.stock !== undefined && item.stock <= 0)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors ${
                      item.status === 'sold' || (item.stock !== undefined && item.stock <= 0)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <FaShoppingCart className="text-sm" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>

                {/* Added Date */}
                {item.addedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    Added on {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 