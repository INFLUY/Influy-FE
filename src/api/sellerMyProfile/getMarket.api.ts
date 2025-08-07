// 스웨거 셀러

import { API_DOMAINS, SELLER_API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import {
  SellerMarketType,
  SellerMyMarketType,
  SellerOverviewDTO,
} from '@/types/seller/SellerProfile.types';
import { generateApiPath } from '@/api/utils';

// 유저의 셀러 마켓 조회
export const getMarket = async ({ sellerId }: { sellerId: number }) => {
  const response = await instance.get<ApiResponse<SellerMarketType>>(
    generateApiPath(API_DOMAINS.SELLER_MARKET, { sellerId })
  );
  return response.data.result;
};

// 셀러 본인 마켓 조회
export const getMyMarket = async () => {
  const response = await instance.get<ApiResponse<SellerMyMarketType>>(
    SELLER_API_DOMAINS.SELLER_MY_MARKET
  );
  return response.data.result;
};

// 셀러 오버뷰 정보
export const getSellerOverview = async (sellerId: number) => {
  const response = await instance.get<ApiResponse<SellerOverviewDTO>>(
    generateApiPath(API_DOMAINS.GET_SELLER_OVERVIEW, { sellerId })
  );
  return response.data.result;
};
