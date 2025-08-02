import { SELLER_API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import {
  SellerEditProfileType,
  SellerProfileType,
} from '@/types/seller/SellerProfile.types';

export const getSellerMyProfile = async () => {
  const response = await instance.get<ApiResponse<SellerProfileType>>(
    SELLER_API_DOMAINS.SELLER_MY_PROFILE
  );
  return response.data.result;
};

export const patchSellerMyProfile = async ({
  data,
}: {
  data: SellerEditProfileType;
}) => {
  const response = await instance.patch<ApiResponse<SellerProfileType>>(
    SELLER_API_DOMAINS.SELLER_MY_PROFILE,
    data
  );
  return response.data.result;
};
