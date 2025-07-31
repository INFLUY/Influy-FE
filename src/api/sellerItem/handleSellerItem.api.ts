import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { ItemDetail, SellerItemsResponse } from '@/types/common/ItemType.types';

export const getSellerItems = async ({
  sellerId,
  archive,
  sortType,
  onGoing,
  page,
  size,
}: {
  sellerId: number;
  archive: boolean;
  sortType?: 'END_DATE' | 'CREATE_DATE';
  onGoing: boolean;
  page: number;
  size: number;
}): Promise<ApiResponse<SellerItemsResponse>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_MARKET_ITEMS, { sellerId }),
    {
      params: { archive, page, size, sortType, onGoing },
    }
  );
  return response.data;
};

export const getSellerItemDetail = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}): Promise<ApiResponse<ItemDetail>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_MARKET_ITEM, { sellerId, itemId })
  );
  return response.data;
};
