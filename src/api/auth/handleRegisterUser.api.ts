import { instance } from '@/api/axiosInstance';
import { API_DOMAINS } from '@/constants/api';
import { SellerSignup, UserSignup } from '@/types/common/AuthTypes.types';

export const postRegisterSeller = async ({ data }: { data: SellerSignup }) => {
  const response = await instance.post(API_DOMAINS.SELLER_MY_JOIN, data);
  return response.data.result;
};

export const postRegisterUser = async ({ data }: { data: UserSignup }) => {
  const response = await instance.post(API_DOMAINS.USER_JOIN, data);
  return response.data.result;
};
