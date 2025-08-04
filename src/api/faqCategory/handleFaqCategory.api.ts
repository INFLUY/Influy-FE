import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { CategoryPostType } from '@/services/sellerFaqCard/mutation/usePostItemFaqCategory';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { CategoryType } from '@/types/common/CategoryType.types';
import { FAQCategoryResponse } from '@/types/common/FAQ.types';

export const getFaqCategory = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const response = await instance.get<ApiResponse<FAQCategoryResponse>>(
    generateApiPath(API_DOMAINS.SELLER_GET_FAQ_CATEGORIES, { sellerId, itemId })
  );
  return response.data.result;
};

export const postFaqCategory = async ({
  itemId,
  data,
}: {
  itemId: number;
  data: CategoryPostType;
}) => {
  const response = await instance.post<ApiResponse<CategoryType>>(
    generateApiPath(API_DOMAINS.SELLER_HANDLE_FAQ_CATEGORIES, {
      itemId,
    }),
    data
  );
  return response.data.result;
};
