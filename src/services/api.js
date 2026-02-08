import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000'
  return `${baseUrl}${imagePath}`
}

export const authAPI = {
  login: (credentials) => {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    return api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/users/me'),
  googleAuth: (googleData) => api.post('/auth/google', googleData),
  linkGoogleAccount: (googleData) => api.post('/auth/google-link', googleData),
};

export const productAPI = {
  getProducts: () => api.get('/products/'),
  getProduct: (id) => api.get(`/products/${id}/`),
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/orders/guest', orderData),
  getOrders: () => api.get('/orders/'),
  getCustomerOrders: (customerPhone, customerEmail) => 
    api.get(`/orders/customer/?customer_phone=${customerPhone}${customerEmail ? `&customer_email=${customerEmail}` : ''}`),
  getOrder: (id) => api.get(`/orders/${id}/`),
};

export default api;
