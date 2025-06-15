import axios from 'axios';

const API_URL = "http://46.8.232.177:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Добавляем интерсептор для токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await api.post('/api/v1/auth/token', formData, {
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
    try {
      const response = await api.get('/api/v1/flowers/');
      return response.data;
    } catch (error) {
      throw error;
    }
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