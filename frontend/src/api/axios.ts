import axios from 'axios';
import { useAuthStore } from '../Store/authStore';

const BASE_URL = 'http://192.168.1.11:5000'; // replace with your actual local IP

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
