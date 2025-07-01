import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load wishlist from localStorage on mount
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((i) => i._id === item._id);
      if (existingItem) {
        return prevWishlist; // Item already in wishlist
      }
      return [...prevWishlist, { ...item, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== itemId));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  const isInWishlist = (itemId) => {
    return wishlist.some((item) => item._id === itemId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const getWishlistItems = () => {
    return wishlist;
  };

  const moveToCart = (itemId, cartContext) => {
    const item = wishlist.find((i) => i._id === itemId);
    if (item) {
      cartContext.addToCart(item, item.type || 'product');
      removeFromWishlist(itemId);
    }
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    getWishlistItems,
    moveToCart,
    loading,
    setLoading
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext; 