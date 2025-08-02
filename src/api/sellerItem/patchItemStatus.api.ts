import { SELLER_API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { ItemCurrentStatusType } from '@/types/common/ItemType.types';

export const patchItemStatus = async ({
  itemId,
  status,
}: {
  itemId: number;
  status: ItemCurrentStatusType;
}) => {
  const response = await instance.patch(
    generateApiPath(SELLER_API_DOMAINS.SELLER_ITEM_STATUS, { itemId }),
    {
      status,
    }
  );
  return response.data.result;
};
