import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ItemCategoryResponse } from '@/types/common/CategoryType.types';

export const getItemCategory = async (): Promise<ItemCategoryResponse> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.ITEM_CATEGORIES)
  );
  return response.data;
};
