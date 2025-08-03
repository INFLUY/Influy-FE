import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { FAQCategoryResponse } from '@/types/common/FAQ.types';

export const getFaqCategory = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const response = await instance.get<ApiResponse<FAQCategoryResponse>>(
    generateApiPath(API_DOMAINS.SELLER_FAQ_CATEGORIES, { sellerId, itemId })
  );
  return response.data.result;
};
