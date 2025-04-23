import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
