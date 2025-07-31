import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';

export const postLogout = async () => {
  const response = await instance.post(API_DOMAINS.LOGOUT);
  return response.data;
};
