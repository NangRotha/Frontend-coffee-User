import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';

const Menu = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError(language === 'km' ? 'បរាជ័យក្នុងការផ្ទុកផលិតផលបរាជ័យ' : 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-coffee-50 flex items-center justify-center">
        <div className="text-coffee-600 font-khmer">{t('loading')}...</div>
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

  return (
    <div className="bg-coffee-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-coffee-900 mb-4 font-khmer">{t('ourMenu')}</h1>
          <p className="text-coffee-600 mb-6 font-khmer">
            {language === 'km' ? 'រកឃើញជម្រើសកាហ្វេ និងនំផ្លែឈើដ៏អស្ចារ្យរបស់យើង' : 'Discover our delicious selection of coffee and treats'}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder={language === 'km' ? 'ស្វែងរកផលិតផល...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category === cat
                      ? 'bg-coffee-600 text-white'
                      : 'bg-white text-coffee-700 hover:bg-coffee-100'
                  }`}
                >
                  {cat === 'all' ? t('allProducts') : (language === 'km' ? (cat === 'coffee' ? 'កាហ្វេ' : cat === 'tea' ? 'តែ' : cat === 'pastry' ? 'នំផ្លែឈើ' : cat === 'sandwich' ? 'ស៊ានវិច' : cat === 'smoothie' ? 'ស្មែនថ៍' : cat.charAt(0).toUpperCase() + cat.slice(1)) : cat.charAt(0).toUpperCase() + cat.slice(1))}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-coffee-600 font-khmer">
              {searchTerm || category !== 'all' 
                ? (language === 'km' ? 'រកមិនឃើញផលិតផលដែលត្រូវនឹងលក្ខខណ្ឌរបស់អ្នក។' : 'No products found matching your criteria.')
                : (language === 'km' ? 'មិនមានផលិតផលដែលអាចរកបាននៅពេលនេះ។' : 'No products available at the moment.')}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                language={language}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
