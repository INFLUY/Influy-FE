import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { BaseLinkType, LinkType } from '@/types/seller/LinkType.types';

export const postMarketLink = async ({ data }: { data: BaseLinkType }) => {
  const response = await instance.post(
    API_DOMAINS.SELLR_MY_POST_MARKET_LINKS,
    data
  );
  return response.data;
};

export const getMarketLinks = async ({ sellerId }: { sellerId: number }) => {
  const response = await instance.get<ApiResponse<LinkType[] | []>>(
    generateApiPath(API_DOMAINS.SELLR_MARKET_LINKS, { sellerId })
  );
  return response.data;
};
