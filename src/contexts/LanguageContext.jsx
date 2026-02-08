import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Header
    brandName: 'Coffee University',
    home: 'Home',
    menu: 'Menu',
    cart: 'Cart',
    profile: 'Profile',
    login: 'Login',
    signUp: 'Sign Up',
    logout: 'Logout',
    
    // Footer
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Info',
    myAccount: 'My Account',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    refundPolicy: 'Refund Policy',
    
    // Home
    welcomeTo: 'Welcome to',
    tagline: 'Your premium coffee destination',
    featuredProducts: 'Featured Products',
    orderNow: 'Order Now',
    viewMenu: 'View Menu',
    
    // Menu
    ourMenu: 'Our Menu',
    categories: 'Categories',
    allProducts: 'All Products',
    coffee: 'Coffee',
    pastry: 'Pastry',
    other: 'Other',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    empty: 'Your cart is empty',
    subtotal: 'Subtotal',
    tax: 'Tax',
    total: 'Total',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    remove: 'Remove',
    quantity: 'Quantity',
    
    // Auth
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    
    // Profile
    myProfile: 'My Profile',
    personalInfo: 'Personal Information',
    orderHistory: 'Order History',
    settings: 'Settings',
    saveChanges: 'Save Changes',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close'
  },
  km: {
    // Header
    brandName: 'មហាវិទ្យាល័យកាហ្វេ',
    home: 'ទំព័រដើម',
    menu: 'ម៉ឺនុយ',
    cart: 'កន្ត្រក',
    profile: 'ប្រវត្តិរូប',
    login: 'ចូល',
    signUp: 'ចុះឈ្មោះ',
    logout: 'ចាកចេញ',
    
    // Footer
    quickLinks: 'តំណភ្លាមៗ',
    contactInfo: 'ព័ត៌មានទំនាក់ទំនង',
    myAccount: 'គណនីរបស់ខ្ញុំ',
    privacyPolicy: 'គោលការណ៍ឯកជនភាព',
    termsOfService: 'លក្ខខណ្ឌប្រើប្រាស់',
    refundPolicy: 'គោលការណ៍សងប្រាក់',
    
    // Home
    welcomeTo: 'សូមស្វាគមន៍មកកាន់',
    tagline: 'គោលដៅកាហ្វេកម្រិតខ្ពស់របស់អ្នក',
    featuredProducts: 'ផលិតផលលេចធ្លោ',
    orderNow: 'បញ្ជាទិញឥឡូវ',
    viewMenu: 'មើលម៉ឺនុយ',
    
    // Menu
    ourMenu: 'ម៉ឺនុយរបស់យើង',
    categories: 'ប្រភេទ',
    allProducts: 'ផលិតផលទាំងអស់',
    coffee: 'កាហ្វេ',
    pastry: 'នំផ្លែឈើ',
    other: 'ផ្សេងៗ',
    addToCart: 'ដាក់ក្នុងកន្ត្រក',
    outOfStock: 'អស់ស្តុក',
    
    // Cart
    shoppingCart: 'កន្ត្រកទិញឥវ៉ាន់',
    empty: 'កន្ត្រករបស់អ្នកទទេ',
    subtotal: 'សរុបរង',
    tax: 'ពន្ធ',
    total: 'សរុប',
    checkout: 'ទូទាត់',
    continueShopping: 'បន្តទិញឥវ៉ាន់',
    remove: 'លុប',
    quantity: 'ចំនួន',
    
    // Auth
    email: 'អ៊ីមែល',
    password: 'ពាក្យសម្ងាត់',
    confirmPassword: 'បញ្ជាក់ពាក្យសម្ងាត់',
    firstName: 'នាមត្រកូល',
    lastName: 'នាមខ្លួន',
    phone: 'លេខទូរស័ព្ទ',
    alreadyHaveAccount: 'មានគណនីរួចហើយ?',
    dontHaveAccount: 'មិនទាន់មានគណនីទេ?',
    
    // Profile
    myProfile: 'ប្រវត្តិរូបរបស់ខ្ញុំ',
    personalInfo: 'ព័ត៌មានផ្ទាល់ខ្លួន',
    orderHistory: 'ប្រវត្តិការបញ្ជាទិញ',
    settings: 'ការកំណត់',
    saveChanges: 'រក្សាទុកការផ្លាស់ប្តូរ',
    
    // Common
    loading: 'កំពុងផ្ទុក...',
    error: 'កំហុស',
    success: 'ជោគជ័យ',
    cancel: 'បោះបង់',
    confirm: 'បញ្ជាក់',
    close: 'បិទ'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'km'; // Default to Khmer
  });

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
