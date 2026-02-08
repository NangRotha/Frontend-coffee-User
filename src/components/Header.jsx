import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t, language } = useLanguage();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data);
        } catch {
          localStorage.removeItem('access_token');
        }
      }
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(count);
    };

    checkAuthStatus();
    updateCartCount();
    
    const handleStorageChange = () => {
      updateCartCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-coffee-800 flex items-center font-khmer">
              <span className="mr-2 text-3xl">☕</span>
              {t('brandName')}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath('/') 
                  ? 'text-coffee-900 bg-coffee-100' 
                  : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              to="/menu"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath('/menu') 
                  ? 'text-coffee-900 bg-coffee-100' 
                  : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
              }`}
            >
              {t('menu')}
            </Link>
            <Link
              to="/cart"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActivePath('/cart') 
                  ? 'text-coffee-900 bg-coffee-100' 
                  : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
              }`}
            >
              {t('cart')}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-coffee-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath('/profile') 
                      ? 'text-coffee-900 bg-coffee-100' 
                      : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
                  }`}
                >
                  {t('profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-coffee-700 hover:text-coffee-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-coffee-50 transition-colors"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-coffee-700 hover:text-coffee-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-coffee-50 transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-coffee-600 hover:bg-coffee-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  {t('signUp')}
                </Link>
              </div>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <LanguageSelector />
            <div className="flex items-center space-x-2">
              <Link
                to="/cart"
                className="relative text-coffee-700 hover:text-coffee-900 p-2"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coffee-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-coffee-700 hover:text-coffee-900 p-2"
              >
                ☰
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-coffee-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActivePath('/') 
                      ? 'text-coffee-900 bg-coffee-100' 
                      : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('home')}
                </Link>
                <Link
                  to="/menu"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActivePath('/menu') 
                      ? 'text-coffee-900 bg-coffee-100' 
                      : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('menu')}
                </Link>
                <Link
                  to="/cart"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActivePath('/cart') 
                      ? 'text-coffee-900 bg-coffee-100' 
                      : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('cart')}
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActivePath('/profile') 
                          ? 'text-coffee-900 bg-coffee-100' 
                          : 'text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('profile')}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-coffee-700 hover:text-coffee-900 hover:bg-coffee-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-coffee-600 text-white hover:bg-coffee-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('signUp')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
