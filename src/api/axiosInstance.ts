import { useAuthStore } from '@/store/authStore';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

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

export const instance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터에 토큰 동적 할당
instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
