import { SELLER_API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { instance } from '../axiosInstance';
import { SellerProfileType } from '@/types/seller/SellerProfile.types';

export const getSellerMyProfile = async (): Promise<
  ApiResponse<SellerProfileType>
> => {
  const response = await instance.get(SELLER_API_DOMAINS.SELLER_MY_PROFILE);
  return response.data;
};
