import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { CategoryType } from '@/types/common/CategoryType.types';

type ItemCategoryResponse = ApiResponse<{
  categoryDtoList: CategoryType[];
}>;

export const getItemCategory = async () => {
  const response = await instance.get<ItemCategoryResponse>(
    generateApiPath(API_DOMAINS.ITEM_CATEGORIES)
  );
  return response.data.result;
};
