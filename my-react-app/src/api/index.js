import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://46.8.232.177:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.request.use(config => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
  }
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Response] ${response.config.url}`);
  }
  return response;
}, error => {
  console.error('Response error:', error.response?.data || error.message);
  return Promise.reject(error);
});

export const authService = {
  async register(userData) {
    try {
      const response = await api.post('/api/v1/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async login(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await api.post('/api/v1/auth/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('access_token');
  }
};

export const flowerService = {
  async getFlowers() {
  const response = await api.get('/api/v1/flowers/');
  return response.data.map(flower => ({
    ...flower,
    temperature_range: flower.temperature_range || { min: null, max: null }
  }));
  },

  async createFlower(flowerData) {
    try {
      const response = await api.post('/api/v1/flowers/', flowerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateFlower(id, flowerData) {
    try {
      const response = await api.put(`/api/v1/flowers/${id}`, flowerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteFlower(id) {
    try {
      await api.delete(`/api/v1/flowers/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export default api;