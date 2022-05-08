import axios from 'axios';

let authToken = localStorage.getItem('authToken') || '';
const baseUrl = 'http://localhost:3333/api';

axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use((config) => {
  if (!authToken) {
    return config;
  }

  config.headers['Authorization'] = `Bearer ${authToken}`;

  return config;
});

axios.interceptors.response.use((config) => {
  if (config.config.url.includes('/register') || config.config.url.includes('/login')) {
    authToken = config.data.token;
    localStorage.setItem('authToken', authToken);
  }

  return config;
});

const api = axios;
export { api };
