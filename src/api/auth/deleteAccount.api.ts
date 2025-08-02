import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';

export const deleteAccount = async () => {
  const response = await instance.delete(API_DOMAINS.DELETE_ACCOUNT);
  return response.data.result;
};
