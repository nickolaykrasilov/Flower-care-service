import axios from 'axios';

const API_URL = "http://46.8.232.177:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Добавляем интерсептор для обработки 401 ошибки
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Попытка обновить токен (если реализовано на бэкенде)
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await api.post('/api/v1/auth/refresh', { 
            refresh_token: refreshToken 
          });
          
          localStorage.setItem('access_token', response.data.access_token);
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload(); // Перезагрузка для очистки состояния
      }
    }
    
    return Promise.reject(error);
  }
);

// Интерсептор для добавления токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async register(userData) {
    const response = await api.post('/api/v1/auth/register', userData);
    return response.data;
  },

  async login(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    
    const response = await api.post('/api/v1/auth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    localStorage.setItem('access_token', response.data.access_token);
    // Если API возвращает refresh token:
    if (response.data.refresh_token) {
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  async checkAuth() {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return false;
      
      // Можно добавить запрос для проверки токена
      await api.get('/api/v1/auth/verify');
      return true;
    } catch (error) {
      return false;
    }
  }
};

export const flowerService = {
  async getFlowers() {
    const response = await api.get('/api/v1/flowers/');
    return response.data;
  },

  async createFlower(flowerData) {
    const response = await api.post('/api/v1/flowers/', flowerData);
    return response.data;
  },

  async updateFlower(id, flowerData) {
    const response = await api.put(`/api/v1/flowers/${id}`, flowerData);
    return response.data;
  },

  async deleteFlower(id) {
    await api.delete(`/api/v1/flowers/${id}`);
  }
};

export default api;