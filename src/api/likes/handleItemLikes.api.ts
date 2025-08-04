import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import {
  ApiResponse,
  Pagination,
  PaginationType,
} from '@/types/common/ApiResponse.types';
import { ItemCardType } from '@/types/common/ItemType.types';
import { LikeItemResponse, LikeType } from '@/types/user/Like.types';

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

export const getLikedItemList = async ({ page, size }: PaginationType) => {
  const response = await instance.get<
    ApiResponse<Pagination<ItemCardType[] | [], 'itemLikeList'>>
  >(API_DOMAINS.GET_LIKED_ITEM_LIST, { params: { page, size } });
  return response.data.result;
};

export const getItemLikeCounts = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const response = await instance.get<ApiResponse<LikeType>>(
    generateApiPath(API_DOMAINS.GET_ITEM_LIKE_COUNTS, {
      sellerId,
      itemId,
    })
  );
  return response.data.result;
};
