import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { LikeItemResponse } from '@/types/common/Like.types';

export const postItemLike = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const response = await instance.post<ApiResponse<LikeItemResponse>>(
    generateApiPath(API_DOMAINS.POST_ITEM_LIKE, { sellerId, itemId })
  );
  return response.data.result;
};

export const patchItemLike = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const response = await instance.patch<ApiResponse<LikeItemResponse>>(
    generateApiPath(API_DOMAINS.PATCH_ITEM_LIKE, { sellerId, itemId })
  );
  return response.data.result;
};
