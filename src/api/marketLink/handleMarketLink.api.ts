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

export const patchLink = async ({
  data,
  announcementId,
  isPrimary,
}: {
  data?: BaseLinkType;
  announcementId: number;
  isPrimary?: boolean;
}) => {
  const response = await instance.patch(
    generateApiPath(API_DOMAINS.SELLER_MY_ANNOUNCEMENT_DETAIL, {
      announcementId,
    }),
    data || {},
    { params: isPrimary !== undefined ? { isPrimary } : undefined }
  );
  return response.data.result;
};

export const getMarketLinks = async ({ sellerId }: { sellerId: number }) => {
  const response = await instance.get<ApiResponse<LinkType[] | []>>(
    generateApiPath(API_DOMAINS.SELLR_MARKET_LINKS, { sellerId })
  );
  return response.data;
};

export const deleteMarketLink = async ({ linkId }: { linkId: number }) => {
  const response = await instance.delete(
    generateApiPath(API_DOMAINS.SELLR_MY_HANDLE_MARKET_LINKS, {
      linkId,
    })
  );
  return response.data.result;
};
