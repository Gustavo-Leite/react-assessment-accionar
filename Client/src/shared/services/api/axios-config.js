import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';

export const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

API.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);