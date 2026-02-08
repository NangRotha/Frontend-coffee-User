export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const calculateTax = (subtotal, taxRate = 0.1) => {
  return subtotal * taxRate;
};

export const calculateDeliveryFee = (subtotal, freeDeliveryThreshold = 50) => {
  return subtotal >= freeDeliveryThreshold ? 0 : 2.99;
};

export const calculateOrderTotal = (cart, taxRate = 0.1, freeDeliveryThreshold = 50) => {
  const subtotal = getCartTotal(cart);
  const tax = calculateTax(subtotal, taxRate);
  const delivery = calculateDeliveryFee(subtotal, freeDeliveryThreshold);
  
  return {
    subtotal,
    tax,
    delivery,
    total: subtotal + tax + delivery
  };
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
};

export const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
};

export const clearCartFromStorage = () => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('storage'));
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
