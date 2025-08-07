import { SELLER_API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { ItemAccessRequestType } from '@/types/common/ItemType.types';

export const patchItemAccess = async ({
  itemId,
  data,
}: {
  itemId: number;
  data: ItemAccessRequestType;
}) => {
  const response = await instance.patch(
    generateApiPath(SELLER_API_DOMAINS.SELLER_PATCH_ITEM_ACCESS, { itemId }),
    {
      data,
    }
  );
  return response.data.result;
};
