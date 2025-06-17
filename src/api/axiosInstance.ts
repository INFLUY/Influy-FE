import { ACCESS_TOKEN_KEY } from '@/constants/api';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) ?? '1234';

export const createAxiosInstance = (
  params?: Record<string, string | number>,
  options?: AxiosRequestConfig
): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params,
    ...options,
  };
  return axios.create(config);
};

export const instance = createAxiosInstance();
