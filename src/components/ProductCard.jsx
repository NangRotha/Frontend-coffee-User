import React from 'react';
import { getImageUrl } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

const ProductCard = ({ product, onAddToCart, isLoading = false, language = 'en' }) => {
  const handleAddToCart = () => {
    if (!isLoading) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-coffee-200 to-coffee-300 flex items-center justify-center">
          {product.image_url ? (
            <img 
              src={getImageUrl(product.image_url)} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}
          <div className={`text-6xl ${product.image_url ? 'hidden' : ''}`}>☕</div>
        </div>
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-coffee-600 text-white text-xs px-2 py-1 rounded-full">
            {language === 'km' ? 'ពិសេស' : 'Featured'}
          </span>
        )}
        {product.is_available === false && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">{language === 'km' ? 'អស់ស្តុក' : 'Out of Stock'}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <h3 className={`text-xl font-semibold text-coffee-800 ${language === 'km' ? 'font-khmer' : ''}`}>{product.name}</h3>
          <p className="text-sm text-coffee-600 capitalize">
            {language === 'km' ? (product.category === 'coffee' ? 'កាហ្វេ' : product.category === 'tea' ? 'តែ' : product.category === 'pastry' ? 'នំផ្លែឈើ' : product.category === 'sandwich' ? 'ស៊ានវិច' : product.category === 'smoothie' ? 'ស្មែនថ៍' : product.category || 'ភេសជ្ជៈ') : (product.category || 'Beverage')}
          </p>
        </div>
        
        <p className={`text-coffee-600 mb-4 line-clamp-2 ${language === 'km' ? 'font-khmer' : ''}`}>
          {product.description || (language === 'km' ? 'កាហ្វេដែលប្រើកាន់ដោយគ្រឿងកាហ្វេគុណភាពខ្ពស់។' : 'Delicious coffee made with premium ingredients.')}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-coffee-700">${product.price}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="ml-2 text-sm text-coffee-500 line-through">
                ${product.original_price}
              </span>
            )}
          </div>
          
          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1 text-sm text-coffee-600">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isLoading || product.is_available === false}
          className={`w-full font-medium py-2 px-4 rounded transition duration-300 ${
            product.is_available === false
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isLoading
              ? 'bg-coffee-400 text-white cursor-wait'
              : 'bg-coffee-600 hover:bg-coffee-700 text-white'
          }`}
        >
          {isLoading ? (language === 'km' ? 'កំពុងបន្ថែ...' : 'Adding...') : product.is_available === false ? (language === 'km' ? 'អស់ស្តុក' : 'Out of Stock') : (language === 'km' ? 'ដាក់ក្នុងកន្ត្រក' : 'Add to Cart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
