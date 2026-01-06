//donde se comunica el front con el backend
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para manejar cookies/sesiones si el backend lo requiere
});

// Interceptor para logs (opcional)
api.interceptors.request.use(
  (config) => {
    // Puedes agregar tokens aquí si es necesario
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
