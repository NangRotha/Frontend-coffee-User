import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/cartUtils';
import KHQRPayment from './KHQRPayment';

const CheckoutForm = ({ cart, orderTotals, onPlaceOrder, loading, onCancel }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    delivery_address: '',
    payment_method: 'cash',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);
  const [showKHQR, setShowKHQR] = useState(false);

  // Generate order number using a counter to avoid impure function call
  const [orderCounter] = useState(() => Date.now());
  const orderNumber = `ORD-${orderCounter}`;

  const initializeAutocomplete = () => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('address-input')
      );
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setFormData(prev => ({
            ...prev,
            delivery_address: place.formatted_address
          }));
        }
      });
    }
  };

  useEffect(() => {
    // Load Google Maps script
    if (!window.google && !document.querySelector('#google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.onload = () => initializeAutocomplete();
      document.body.appendChild(script);
    } else if (window.google) {
      initializeAutocomplete();
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Name is required';
    }
    
    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.customer_phone.replace(/\D/g, ''))) {
      newErrors.customer_phone = 'Please enter a valid phone number';
    }
    
    if (formData.customer_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      newErrors.customer_email = 'Please enter a valid email address';
    }
    
    if (!formData.delivery_address.trim()) {
      newErrors.delivery_address = 'Delivery address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // If KHQR is selected, show KHQR payment modal
      if (formData.payment_method === 'khqr') {
        setShowKHQR(true);
        return;
      }
      
      // For other payment methods, proceed normally
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        ...formData
      };
      
      onPlaceOrder(orderData);
    }
  };

  const handleKHRPaymentComplete = (paymentData) => {
    // Add KHQR payment data to form
    const orderData = {
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      ...formData,
      ...paymentData
    };
    
    setShowKHQR(false);
    onPlaceOrder(orderData);
  };

  const handleKHQRCancel = () => {
    setShowKHQR(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setFormData(prev => ({
      ...prev,
      customer_phone: formatted
    }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-coffee-800">Checkout</h2>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-coffee-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-coffee-800 mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Items ({cart.length}):</span>
                  <span>{formatCurrency(orderTotals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatCurrency(orderTotals.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>
                    {orderTotals.delivery === 0 ? 'FREE' : formatCurrency(orderTotals.delivery)}
                  </span>
                </div>
                <div className="border-t pt-1 mt-1">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{formatCurrency(orderTotals.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 ${
                      errors.customer_name ? 'border-red-500' : 'border-coffee-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.customer_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 ${
                      errors.customer_phone ? 'border-red-500' : 'border-coffee-300'
                    }`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.customer_phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 ${
                    errors.customer_email ? 'border-red-500' : 'border-coffee-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.customer_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Delivery Address *
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="use-google-maps"
                      checked={useGoogleMaps}
                      onChange={(e) => setUseGoogleMaps(e.target.checked)}
                      className="rounded text-coffee-600 focus:ring-coffee-500"
                    />
                    <label htmlFor="use-google-maps" className="text-sm text-coffee-600">
                      Use Google Maps for address
                    </label>
                  </div>
                  
                  {useGoogleMaps ? (
                    <input
                      id="address-input"
                      type="text"
                      name="delivery_address"
                      value={formData.delivery_address}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 ${
                        errors.delivery_address ? 'border-red-500' : 'border-coffee-300'
                      }`}
                      placeholder="Start typing your address..."
                    />
                  ) : (
                    <textarea
                      name="delivery_address"
                      value={formData.delivery_address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 ${
                        errors.delivery_address ? 'border-red-500' : 'border-coffee-300'
                      }`}
                      placeholder="Enter your full delivery address..."
                    />
                  )}
                  
                  {errors.delivery_address && (
                    <p className="text-red-500 text-sm mt-1">{errors.delivery_address}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Payment Method *
                </label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="khqr">📱 KHQR (Cambodian QR)</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="apple_pay">Apple Pay</option>
                  <option value="google_pay">Google Pay</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  placeholder="Special instructions, delivery preferences, etc..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 px-4 py-3 border border-coffee-300 text-coffee-700 rounded-lg hover:bg-coffee-50 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-coffee-600 hover:bg-coffee-700 disabled:bg-coffee-400 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                >
                  {loading ? 'Processing...' : `Place Order • ${formatCurrency(orderTotals.total)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* KHQR Payment Modal */}
      {showKHQR && (
        <KHQRPayment
          amount={orderTotals.total}
          onPaymentSuccess={handleKHRPaymentComplete}
          onCancel={handleKHQRCancel}
        />
      )}
    </>
  );
};

export default CheckoutForm;
