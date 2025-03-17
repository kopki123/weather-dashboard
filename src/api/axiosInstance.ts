import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 10 * 1000, // 10s
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
