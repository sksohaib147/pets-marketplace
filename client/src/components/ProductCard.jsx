import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaTag, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { formatCondition, calculateDiscount } from '../utils/ecommerce';
import { formatPKR, formatUSD } from '../utils/currency';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Handle both USD and PKR prices
  const currentPrice = product.priceUSD || product.pricePKR || product.price;
  const originalPrice = product.originalPriceUSD || product.originalPricePKR || product.originalPrice;
  const hasDiscount = originalPrice && originalPrice > currentPrice;
  const discountPercentage = hasDiscount 
    ? calculateDiscount(originalPrice, currentPrice)
    : 0;

  const formatPrice = (price) => {
    if (product.priceUSD || product.originalPriceUSD) {
      return formatUSD(price);
    }
    return formatPKR(price);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) return;
    
    setIsAddingToCart(true);
    try {
      addToCart(product, 'product');
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
    
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/products/${product.slug || product._id}`}>
        <div className="relative h-48">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badges */}
          {product.status === 'sold' && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded text-xs font-semibold">
              Sold
            </div>
          )}
          
          {product.stock <= 0 && product.status !== 'sold' && (
            <div className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 m-2 rounded text-xs font-semibold">
              Out of Stock
            </div>
          )}
          
          {hasDiscount && (
            <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 m-2 rounded text-xs font-semibold">
              {discountPercentage}% OFF
            </div>
          )}
          
          {product.shipping?.freeShipping && (
            <div className="absolute bottom-0 left-0 bg-blue-500 text-white px-2 py-1 m-2 rounded text-xs font-semibold">
              Free Shipping
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          >
            <FaHeart 
              className={`text-sm ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Price Section */}
          <div className="flex flex-col space-y-1 mb-3">
            {hasDiscount ? (
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-red-600">{formatPrice(currentPrice)}</span>
                <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-red-600">{formatPrice(currentPrice)}</span>
            )}
            
            {/* Stock Indicator */}
            {product.stock > 0 && (
              <span className="text-xs text-green-600">
                {product.stock <= 5 ? `Only ${product.stock} left!` : 'In Stock'}
              </span>
            )}
          </div>

          {/* Category and Condition */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
            <span className="text-sm text-gray-500">{formatCondition(product.condition)}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-1 text-gray-400" />
            <span>{product.location}</span>
          </div>

          {/* Ratings */}
          {product.ratings?.average > 0 && (
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-medium">{product.ratings.average.toFixed(1)}</span>
              <span className="ml-1 text-gray-500">({product.ratings.count})</span>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
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
          disabled={product.stock <= 0 || isAddingToCart}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-colors ${
            product.stock <= 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
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
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 