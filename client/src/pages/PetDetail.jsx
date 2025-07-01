import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaMapMarkerAlt, FaPaw, FaStar, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/pets/${id}`);
        if (!response.ok) {
          throw new Error('Pet not found');
        }
        const data = await response.json();
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/pet/${id}` } });
      return;
    }

    if (pet.status !== 'available') return;

    setIsAddingToCart(true);
    try {
      addToCart(pet, 'pet');
      // Show success message
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pet Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The pet you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/pets')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Pets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 mb-4">
                <img
                  src={pet.images?.[selectedImage] || '/placeholder.jpg'}
                  alt={pet.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className={`absolute top-4 right-4 ${getStatusColor(pet.status)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {pet.status}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              {pet.images && pet.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {pet.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${pet.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pet Information */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
                <button
                  onClick={handleWishlistToggle}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaHeart className={`text-2xl ${isInWishlist(pet._id) ? 'text-red-500' : ''}`} />
                </button>
              </div>

              <div className="text-3xl font-bold text-red-600 mb-4">
                ${pet.price}
                {pet.originalPrice && pet.originalPrice > pet.price && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    ${pet.originalPrice}
                  </span>
                )}
              </div>

              {/* Pet Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Species</p>
                    <p className="font-semibold">{pet.species}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Breed</p>
                    <p className="font-semibold">{pet.breed}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-semibold">{pet.age} {pet.ageUnit || 'years'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold">{pet.gender}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{pet.location}</span>
                </div>
              </div>

              {/* Description */}
              {pet.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{pet.description}</p>
                </div>
              )}

              {/* Tags */}
              {pet.tags && pet.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={pet.status !== 'available' || isAddingToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    pet.status !== 'available'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <FaShoppingCart />
                      {pet.status !== 'available' ? 'Not Available' : 'Add to Cart'}
                    </>
                  )}
                </button>

                {pet.seller && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Contact Seller</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{pet.seller.name}</p>
                      {pet.seller.phone && (
                        <div className="flex items-center text-sm">
                          <FaPhone className="mr-2 text-gray-400" />
                          <span>{pet.seller.phone}</span>
                        </div>
                      )}
                      {pet.seller.email && (
                        <div className="flex items-center text-sm">
                          <FaEnvelope className="mr-2 text-gray-400" />
                          <span>{pet.seller.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail; 