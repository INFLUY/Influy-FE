import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { ItemOverviewDTO } from '@/types/common/ItemType.types';
import { SELLER_API_DOMAINS } from '@/constants/api';
export const fetchItemOverview = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}): Promise<ItemOverviewDTO> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.ITEM_OVERVIEW, { sellerId, itemId })
  );
  return response.data.result ?? null;
};
