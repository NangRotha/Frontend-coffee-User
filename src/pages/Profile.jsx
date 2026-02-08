import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, orderAPI } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const demoMode = localStorage.getItem('is_demo_mode') === 'true';
    setIsDemoMode(demoMode);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Check if we're in demo mode
      const isDemoMode = localStorage.getItem('is_demo_mode') === 'true';
      const demoUser = localStorage.getItem('demo_user');
      
      if (isDemoMode && demoUser) {
        // Use demo user data
        const userData = JSON.parse(demoUser);
        setUser(userData);
        setOrders([]); // Demo user has no orders initially
        return;
      }
      
      // Try to get authenticated user data
      try {
        const userResponse = await authAPI.getCurrentUser();
        setUser(userResponse.data);
        
        // If authenticated, get user's orders
        const ordersResponse = await orderAPI.getOrders();
        setOrders(ordersResponse.data || []);
      } catch {
        // If not authenticated, try to get orders by customer info
        const customerPhone = localStorage.getItem('customer_phone') || '0000000000';
        const ordersResponse = await orderAPI.getCustomerOrders(customerPhone);
        setOrders(ordersResponse.data || []);
        
        // Create a basic user object from orders if available
        if (ordersResponse.data && ordersResponse.data.length > 0) {
          const firstOrder = ordersResponse.data[0];
          setUser({
            email: firstOrder.customer_email || 'guest@example.com',
            name: firstOrder.customer_name || 'Guest User',
            phone: firstOrder.customer_phone
          });
        }
      }
      
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('demo_user');
    localStorage.removeItem('is_demo_mode');
    localStorage.removeItem('customer_phone');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-coffee-50 flex items-center justify-center">
        <div className="text-coffee-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-coffee-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-coffee-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-coffee-600 mb-4">Please log in to view your profile</p>
          <Link
            to="/login"
            className="bg-coffee-600 hover:bg-coffee-700 text-white font-medium py-2 px-4 rounded transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-coffee-800">☕ Coffee Shop</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-coffee-700 hover:text-coffee-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/menu" className="text-coffee-700 hover:text-coffee-900 px-3 py-2 rounded-md text-sm font-medium">
                Menu
              </Link>
              <Link to="/cart" className="text-coffee-700 hover:text-coffee-900 px-3 py-2 rounded-md text-sm font-medium">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isDemoMode && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> You're using a demo account. Orders placed here won't be real.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt="Profile" 
                    className="mx-auto h-20 w-20 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="mx-auto h-20 w-20 rounded-full bg-coffee-200 flex items-center justify-center mb-4">
                    <span className="text-3xl">👤</span>
                  </div>
                )}
                <h2 className="text-xl font-semibold text-coffee-800">
                  {user.full_name || user.name || 'User'}
                </h2>
                <p className="text-coffee-600">{user.email}</p>
                {user.phone && (
                  <p className="text-sm text-coffee-500">{user.phone}</p>
                )}
                <p className="text-sm text-coffee-500 mt-2">
                  Member since {new Date().toLocaleDateString()}
                </p>
                {user.is_google_user && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      </svg>
                      Google User
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 space-y-2">
                <button className="w-full text-left px-4 py-2 text-coffee-700 hover:bg-coffee-50 rounded">
                  Edit Profile
                </button>
                {!user.is_google_user && (
                  <button className="w-full text-left px-4 py-2 text-coffee-700 hover:bg-coffee-50 rounded">
                    Change Password
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-coffee-800 mb-4">Order History</h3>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-coffee-600 mb-4">
                    {isDemoMode 
                      ? "Start ordering to see your order history!" 
                      : "You haven't placed any orders yet"
                    }
                  </p>
                  {isDemoMode && (
                    <p className="text-sm text-blue-600 mb-4">
                      In demo mode, you can test the ordering system without real purchases.
                    </p>
                  )}
                  <Link
                    to="/menu"
                    className="bg-coffee-600 hover:bg-coffee-700 text-white font-medium py-2 px-4 rounded transition duration-300 inline-block"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-coffee-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-coffee-800">
                            Order #{order.id} {order.order_number && `(${order.order_number})`}
                          </h4>
                          <p className="text-sm text-coffee-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                          {order.payment_method && (
                            <p className="text-xs text-coffee-500">
                              Payment: {order.payment_method}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'ready' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                          </span>
                          <p className="text-lg font-semibold text-coffee-800 mt-1">
                            ${order.total_amount?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-coffee-600">
                        {order.items?.map((item, index) => (
                          <span key={index}>
                            {item.quantity}x {item.product_name || item.name}
                            {index < order.items.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                      
                      {order.delivery_address && (
                        <div className="text-xs text-coffee-500 mt-2">
                          📍 {order.delivery_address}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-coffee-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-coffee-50 rounded">
                  <p className="text-2xl font-bold text-coffee-800">{orders.length}</p>
                  <p className="text-sm text-coffee-600">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-coffee-50 rounded">
                  <p className="text-2xl font-bold text-coffee-800">
                    ${orders.reduce((sum, order) => sum + (order.total_amount || 0), 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-coffee-600">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
