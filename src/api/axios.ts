import axios from 'axios';
import { getErrorMessage } from '../services/error.service';

export const api = axios.create({
  baseURL: import.meta.env.VITE_PRONTUARIO_API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (err) => {
    const message = getErrorMessage(err);

    if (err.response?.status === 401) {
      localStorage.removeItem('token');

      window.location.href = '/';
    }

    return Promise.reject({
      ...err,
      customMessage: message,
    });
  },
);
