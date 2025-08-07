import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { CategoryPostType } from '@/services/sellerFaqCard/mutation/usePostItemFaqCategory';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { CategoryType } from '@/types/common/CategoryType.types';
import { FAQCategoryResponse } from '@/types/common/FAQ.types';
import { CategoryPatchType } from '@/services/sellerFaqCard/mutation/usePatchFaqCategory';
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

export const patchFaqCategory = async ({
  itemId,
  data,
}: {
  itemId: number;
  data: CategoryPatchType;
}) => {
  const response = await instance.patch<ApiResponse<CategoryType>>(
    generateApiPath(API_DOMAINS.SELLER_HANDLE_FAQ_CATEGORIES, {
      itemId,
    }),
    data
  );
  return response.data.result;
};

export const deleteFaqCategory = async ({
  itemId,
  id,
}: {
  itemId: number;
  id: number;
}): Promise<void> => {
  await instance.delete(
    generateApiPath(API_DOMAINS.SELLER_HANDLE_FAQ_CATEGORIES, { itemId }),
    {
      data: {
        id,
      },
    }
  );
};

export const patchFaqCategoryOrder = async ({
  itemId,
  ids,
}: {
  itemId: number;
  ids: number[];
}): Promise<void> => {
  await instance.patch(
    generateApiPath(API_DOMAINS.SELLER_PATCH_FAQ_CATEGORIES_ORDER, { itemId }),
    {
      ids,
    }
  );
};
