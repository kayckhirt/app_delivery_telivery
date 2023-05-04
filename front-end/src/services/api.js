import axios from 'axios';
import { setupInterceptors } from './interceptors';

const API_URL = process.env.REACT_APP_HOSTNAME;

const api = setupInterceptors(
  axios.create({
    baseURL: API_URL,
  }),
);
export default api;
