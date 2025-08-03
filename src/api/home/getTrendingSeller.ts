import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import { SellerThumbnailListType } from '@/types/user/Home.types';

export const getTrendingSeller = async (): Promise<SellerThumbnailListType> => {
  const response = await instance.get(API_DOMAINS.HOME_TRENDING_SELLER);
  return response.data.result;
};
