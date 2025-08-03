import { SELLER_API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import { ItemSortType } from '@/types/common/ItemType.types';

export const putSellerMyItemSortType = async ({
  sortType,
}: {
  sortType: ItemSortType;
}) => {
  const response = await instance.put(
    SELLER_API_DOMAINS.SELLER_ITEM_SORT,
    {},
    {
      params: { 'sort-type': sortType },
    }
  );
  return response.data.result;
};
