import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { useCart } from '../hooks/useCart';
import { calculateOrderTotal, formatCurrency } from '../utils/cartUtils';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const orderTotals = calculateOrderTotal(cart);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckout(true);
  };

  const handlePlaceOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderAPI.createOrder(orderData);
      
      clearCart();
      setShowCheckout(false);
      
      alert('Order placed successfully!');
      console.log('Order created:', response.data);
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Failed to place order. Please try again.');
      }
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div className="bg-coffee-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-coffee-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-coffee-800 mb-4">Your cart is empty</h2>
            <p className="text-coffee-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/menu"
              className="bg-coffee-600 hover:bg-coffee-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 inline-block"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-coffee-800 mb-4">
                    Cart Items ({cart.length})
                  </h2>
                  
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-coffee-800 mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-coffee-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(orderTotals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-coffee-600">
                    <span>Tax (10%)</span>
                    <span>{formatCurrency(orderTotals.tax)}</span>
                  </div>
                  <div className="flex justify-between text-coffee-600">
                    <span>Delivery</span>
                    <span>
                      {orderTotals.delivery === 0 ? 'FREE' : formatCurrency(orderTotals.delivery)}
                    </span>
                  </div>
                  {orderTotals.delivery > 0 && (
                    <p className="text-xs text-coffee-500">
                      Free delivery on orders over $50
                    </p>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-semibold text-coffee-800">
                      <span>Total</span>
                      <span>{formatCurrency(orderTotals.total)}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                  className="w-full bg-coffee-600 hover:bg-coffee-700 disabled:bg-coffee-400 text-white font-medium py-3 px-4 rounded transition duration-300"
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <Link
                  to="/menu"
                  className="block w-full text-center mt-4 text-coffee-600 hover:text-coffee-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Form Modal */}
      {showCheckout && (
        <CheckoutForm
          cart={cart}
          orderTotals={orderTotals}
          onPlaceOrder={handlePlaceOrder}
          loading={loading}
          onCancel={handleCancelCheckout}
        />
      )}
    </div>
  );
};

export default Cart;
