import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-coffee-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">☕</span>
              <h3 className="text-xl font-bold font-khmer">{t('brandName')}</h3>
            </div>
            <p className="text-coffee-300 mb-4">
              {language === 'km' ? 'គោលដៅកាហ្វេកម្រិតខ្ពស់របស់អ្នក ផ្តល់ជូនកាហ្វេគុណភាពខ្ពស់ នំផ្លែឈើ និងផលិតផលផ្សេងៗទៀតតាំងពីឆ្នាំ 2024។' : 'Your favorite local coffee university serving premium coffee, pastries, and more since 2024.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-coffee-300 hover:text-white transition-colors">
                <span className="text-xl">📧</span>
              </a>
              <a href="#" className="text-coffee-300 hover:text-white transition-colors">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="text-coffee-300 hover:text-white transition-colors">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-coffee-300 hover:text-white transition-colors">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 font-khmer">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-coffee-300 hover:text-white transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-coffee-300 hover:text-white transition-colors">
                  {t('menu')}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-coffee-300 hover:text-white transition-colors">
                  {t('cart')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-coffee-300 hover:text-white transition-colors">
                  {t('myAccount')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 font-khmer">{t('contactInfo')}</h4>
            <ul className="space-y-2 text-coffee-300">
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                {language === 'km' ? '១២៣ វិថីកាហ្វេ, ក្រុង' : '123 Coffee Street, City'}
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                {language === 'km' ? '+៨៥៥ (៩៩) ១២៣-៤៥៦៧' : '+1 (555) 123-4567'}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                {language === 'km' ? 'info@coffeeuniversity.edu' : 'info@coffeeshop.com'}
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕐</span>
                {language === 'km' ? 'ច-ស: ៧ព្រឹក-៨យប់' : 'Mon-Fri: 7AM-8PM'}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-coffee-800 mt-8 pt-8 text-center text-coffee-400">
          <p>&copy; 2024 {t('brandName')}. {language === 'km' ? 'រក្សាសិទ្ធិគ្រប់យ៉ាង។' : 'All rights reserved.'}</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-colors">{t('privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('termsOfService')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('refundPolicy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
