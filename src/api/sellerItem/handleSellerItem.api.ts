import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { ItemDetail } from '@/types/common/ItemType.types';

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
