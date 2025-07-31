import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { LikeType } from '@/types/common/Like.types';

export const getSellerLikes = async ({ sellerId }: { sellerId: number }) => {
  const response = await instance.get<ApiResponse<LikeType>>(
    generateApiPath(API_DOMAINS.SELLER_MARKET_LIKES, { sellerId })
  );
  return response.data;
};
