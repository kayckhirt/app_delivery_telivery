import axios from 'axios';
import { setupInterceptors } from './interceptors';

const API_URL = `http://${process.env.REACT_APP_HOSTNAME || 'localhost'}:${process.env.REACT_APP_BACKEND_PORT || '3001'}`;

const api = setupInterceptors(
  axios.create({
    baseURL: API_URL,
  }),
);
export default api;
