import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupInterceptors } from '@/api/auth/authInterceptor';

const BASE_URL = import.meta.env.VITE_API_URL;

export const createAxiosInstance = (
  params?: Record<string, string | number>,
  options?: AxiosRequestConfig
): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    params,
    ...options,
  };
  return axios.create(config);
};

export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

setupInterceptors(instance);
