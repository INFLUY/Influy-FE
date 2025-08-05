import { SELLER_API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { SellerPulicResponse } from '@/types/seller/SellerProfile.types';

export const putSellerPublic = async ({ status }: { status: boolean }) => {
  const response = await instance.put<ApiResponse<SellerPulicResponse>>(
    SELLER_API_DOMAINS.SELLER_HANDLE_PUBLIC,
    {},
    { params: { status } }
  );
  return response.data.result;
};
