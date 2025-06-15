import axios from 'axios';

const API_URL = "http://46.8.232.177:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // Добавьте, если API требует авторизацию:
    // "Authorization": "Bearer ваш_токен"
  }
});

export const getFlowers = async () => {
  try {
    const response = await api.get("/api/flowers"); // Уточните точный эндпоинт!
    return response.data;
  } catch (error) {
    console.error("Error fetching flowers:", error);
    throw error;
  }
};

export const createFlower = async (flowerData) => {
  try {
    const response = await api.post("/api/flowers", flowerData);
    return response.data;
  } catch (error) {
    console.error("Error creating flower:", error);
    throw error;
  }
};

export const updateFlower = async (id, flowerData) => {
  try {
    const response = await api.put(`/api/flowers/${id}`, flowerData);
    return response.data;
  } catch (error) {
    console.error("Error updating flower:", error);
    throw error;
  }
};

export const deleteFlower = async (id) => {
  try {
    await api.delete(`/api/flowers/${id}`);
  } catch (error) {
    console.error("Error deleting flower:", error);
    throw error;
  }
};

export default api;