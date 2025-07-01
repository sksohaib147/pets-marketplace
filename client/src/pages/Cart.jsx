import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatUSD, formatPKR } from '../utils/currency';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartItemCount,
    isCartEmpty,
    validateCart
  } = useCart();
  
  const [validationErrors, setValidationErrors] = useState([]);

  const handleQuantityChange = (itemId, newQuantity, type) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity, type);
    }
  };

  const handleRemoveItem = (itemId, type) => {
    removeFromCart(itemId, type);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    const errors = validateCart();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    navigate('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
    setValidationErrors([]);
  };

  // Helper function to format price based on item type
  const formatItemPrice = (item) => {
    if (item.priceUSD || item.originalPriceUSD) {
      return formatUSD(item.priceUSD || item.price);
    }
    return formatPKR(item.pricePKR || item.price);
  };

  if (isCartEmpty()) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl text-gray-400 mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/products')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Browse Products
              </button>
              <button
                onClick={() => navigate('/pets')}
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50"
              >
                Browse Pets
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.15;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-gray-600 mb-6">{getCartItemCount()} items in your cart</p>

        {validationErrors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Some items in your cart have issues:</h3>
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-yellow-700">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
              
              {cart.products.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Products ({cart.products.length})</h3>
                  {cart.products.map(item => (
                    <div key={item._id} className="flex items-center gap-4 border-b py-4">
                      <img 
                        src={item.images?.[0] || '/placeholder.jpg'} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.description?.substring(0, 100)}...</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Product</span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Stock: {item.stock}</span>
                        </div>
                        <p className="font-semibold text-blue-600 mt-1">{formatItemPrice(item)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1, 'product')}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1, 'product')}
                          className="w-12 text-center border rounded"
                          min="1"
                        />
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1, 'product')}
                          disabled={item.quantity >= (item.stock || 999)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item._id, 'product')}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {cart.pets.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Pets ({cart.pets.length})</h3>
                  {cart.pets.map(item => (
                    <div key={item._id} className="flex items-center gap-4 border-b py-4">
                      <img 
                        src={item.images?.[0] || '/placeholder.jpg'} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.description?.substring(0, 100)}...</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Pet</span>
                        </div>
                        <p className="font-semibold text-blue-600 mt-1">{formatItemPrice(item)}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id, 'pet')}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatUSD(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (15%):</span>
                  <span>{formatUSD(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'Free' : formatUSD(shipping)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{formatUSD(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-blue-800 text-sm">
                    Add {formatUSD(100 - subtotal)} more for free shipping!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={validationErrors.length > 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 mb-3"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={handleClearCart}
                className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 