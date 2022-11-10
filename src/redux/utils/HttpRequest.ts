import axios from 'axios';
import { BASE_URL } from './apiUrls';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.response.use((response) => {
  if (response.data.data) {
    response.data = response.data.data;
  }
  return response;
});

export default api;
