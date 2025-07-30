import { API_DOMAINS, SELLER_API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import {
  SellerMarketType,
  SellerMyMarketType,
} from '@/types/seller/SellerProfile.types';
import { generateApiPath } from '@/api/utils';

// 유저의 셀러 마켓 조회
export const getMarket = async ({
  sellerId,
}: {
  sellerId: number;
}): Promise<ApiResponse<SellerMarketType>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_MARKET, { sellerId })
  );
  return response.data;
};

// 셀러 본인 마켓 조회
export const getMyMarket = async (): Promise<
  ApiResponse<SellerMyMarketType>
> => {
  const response = await instance.get(SELLER_API_DOMAINS.SELLER_MY_MARKET);
  return response.data;
};
