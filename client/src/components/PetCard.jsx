import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaHeart, FaPaw, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { formatUSD, formatPKR } from '../utils/currency';

const PetCard = ({ pet }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (pet.status !== 'available') return;
    
    setIsAddingToCart(true);
    try {
      addToCart(pet, 'pet');
      // Show success message or toast
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(pet._id)) {
      removeFromWishlist(pet._id);
    } else {
      addToWishlist(pet);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'sold':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'pending':
        return 'Pending';
      case 'sold':
        return 'Sold';
      default:
        return 'Unknown';
    }
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (pet.priceUSD || pet.originalPriceUSD) {
      return formatUSD(price);
    }
    return formatPKR(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/pets/${pet.slug || pet._id}`}>
        <div className="relative h-48">
          <img
            src={pet.images?.[0] || '/placeholder.jpg'}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badge */}
          <div className={`absolute top-0 right-0 ${getStatusColor(pet.status)} text-white px-2 py-1 m-2 rounded text-xs font-semibold`}>
            {getStatusText(pet.status)}
          </div>
          
          {/* Age Badge */}
          {pet.age && (
            <div className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 m-2 rounded text-xs font-semibold">
              {pet.age} {pet.ageUnit || 'years'}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          >
            <FaHeart 
              className={`text-sm ${isInWishlist(pet._id) ? 'text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {pet.name}
          </h3>
          
          {/* Price Section */}
          <div className="flex flex-col space-y-1 mb-3">
            <span className="text-xl font-bold text-red-600">{formatPrice(pet.price)}</span>
            {pet.originalPrice && pet.originalPrice > pet.price && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(pet.originalPrice)}</span>
            )}
          </div>

          {/* Pet Details */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{pet.species}</span>
              <span className="text-sm text-gray-500">{pet.breed}</span>
            </div>
            
            {pet.gender && (
              <div className="flex items-center text-sm text-gray-600">
                <FaPaw className="mr-1 text-gray-400" />
                <span>{pet.gender}</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-1 text-gray-400" />
            <span>{pet.location}</span>
          </div>

          {/* Description */}
          {pet.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {pet.description}
            </p>
          )}

          {/* Tags */}
          {pet.tags && pet.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {pet.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={pet.status !== 'available' || isAddingToCart}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-colors ${
            pet.status !== 'available'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800'
          }`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : (
            <>
              <FaShoppingCart className="text-sm" />
              {pet.status !== 'available' ? getStatusText(pet.status) : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PetCard; 