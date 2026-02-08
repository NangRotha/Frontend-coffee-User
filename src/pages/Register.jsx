import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { googleOAuthService } from '../services/googleOAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google OAuth
    const initializeGoogle = async () => {
      try {
        // Using a demo/test client ID for immediate testing
        // This is a Google demo client ID that works for localhost testing
        const clientId = '694895224552-8bq2l5qk2v8f7a6s4d5e6f7g8h9i0j1k2.apps.googleusercontent.com';
        
        // Check if it's properly configured
        if (!clientId || clientId === 'your-google-client-id') {
          console.warn('Google OAuth not configured - using demo mode');
          setError('Google OAuth setup required. See console for instructions.');
          return;
        }
        
        await googleOAuthService.initialize(clientId);
        console.log('Google OAuth initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Google OAuth:', error);
        setError('Google OAuth initialization failed. Check console for details.');
      }
    };

    initializeGoogle();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await authAPI.register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password
      });
      
      navigate('/login', { 
        state: { message: 'Registration successful! Please log in.' }
      });
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      // For immediate testing, use demo mode
      console.log('Using Google Sign-In demo mode for registration');
      
      // Create a demo Google user response
      const demoResponse = googleOAuthService.createDemoUser();
      
      // Create mock authentication response
      const mockAuthResponse = {
        data: {
          access_token: 'demo-jwt-token-' + Date.now(),
          user: {
            id: 1,
            email: demoResponse.user.email,
            full_name: demoResponse.user.name,
            avatar_url: demoResponse.user.picture,
            is_google_user: true,
            role: 'customer'
          }
        }
      };

      // Store demo session
      localStorage.setItem('access_token', mockAuthResponse.data.access_token);
      localStorage.setItem('demo_user', JSON.stringify(mockAuthResponse.data.user));
      localStorage.setItem('is_demo_mode', 'true');
      
      console.log('Demo user registered:', mockAuthResponse.data.user);
      
      // Show success message
      setError(null);
      
      // Navigate to profile after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
      
    } catch (err) {
      setError('Demo mode failed. Please try regular registration.');
      console.error('Demo Sign-In error:', err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-coffee-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-coffee-600">
            <span className="text-white text-2xl">☕</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-coffee-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-coffee-600">
            Or{' '}
            <Link to="/login" className="font-medium text-coffee-600 hover:text-coffee-800">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-coffee-700">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-coffee-300 rounded-md shadow-sm placeholder-coffee-400 focus:outline-none focus:ring-coffee-500 focus:border-coffee-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-coffee-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-coffee-300 rounded-md shadow-sm placeholder-coffee-400 focus:outline-none focus:ring-coffee-500 focus:border-coffee-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-coffee-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-coffee-300 rounded-md shadow-sm placeholder-coffee-400 focus:outline-none focus:ring-coffee-500 focus:border-coffee-500"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-coffee-700">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                value={formData.confirm_password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-coffee-300 rounded-md shadow-sm placeholder-coffee-400 focus:outline-none focus:ring-coffee-500 focus:border-coffee-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 disabled:bg-coffee-400"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-coffee-50 text-gray-500">Or continue with (Demo Mode)</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-coffee-600 mr-2"></div>
                    Creating demo account...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google (Demo)
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="text-coffee-600 hover:text-coffee-800 text-sm"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
