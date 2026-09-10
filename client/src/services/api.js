import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const fetchChatHistory = () => API.get('/chat/history');
export const sendChatMessage = (formData) =>
  API.post('/chat/message', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });