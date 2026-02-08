import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const khqrAPI = {
  generateKHQR: async (amount, billNumber = null) => {
    try {
      const params = new URLSearchParams();
      params.append('amount', amount.toString());
      if (billNumber) {
        params.append('bill_number', billNumber);
      }

      const response = await axios.post(`${API_BASE_URL}/khqr/generate?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error generating KHQR:', error);
      throw error;
    }
  },

  verifyKHQRPayment: async (transactionId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/khqr/verify/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error('Error verifying KHQR payment:', error);
      throw error;
    }
  },

  getMerchantInfo: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/khqr/merchant-info`);
      return response.data;
    } catch (error) {
      console.error('Error getting merchant info:', error);
      throw error;
    }
  }
};

export default khqrAPI;
