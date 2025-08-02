import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import {
  ApiResponse,
  Pagination,
  PaginationType,
} from '@/types/common/ApiResponse.types';
import { LikeType, SellerLikeList } from '@/types/user/Like.types';

export const getSellerLikes = async ({ sellerId }: { sellerId: number }) => {
  const response = await instance.get<ApiResponse<LikeType>>(
    generateApiPath(API_DOMAINS.SELLER_MARKET_LIKES, { sellerId })
  );
  return response.data.result;
};

export const getLikedSellerList = async ({ page, size }: PaginationType) => {
  const response = await instance.get<
    ApiResponse<Pagination<SellerLikeList[] | [], 'sellerLikeList'>>
  >(API_DOMAINS.GET_LIKED_SELLER_LIST, { params: { page, size } });
  return response.data.result;
};
