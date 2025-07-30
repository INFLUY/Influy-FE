import { API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import { ItemCardType } from '@/types/common/ItemType.types';

export const getRecommendedItem = async ({
  page,
  size,
  categoryId,
}: {
  page: number;
  size: number;
  categoryId: number | null;
}): Promise<
  ApiResponse<Pagination<ItemCardType[] | [], 'itemPreviewList'>>
> => {
  const params: Record<string, number> = { page, size };

  if (categoryId !== null) {
    params.categoryId = categoryId;
  }

  const response = await instance.get(API_DOMAINS.HOME_RECOMMEND, {
    params,
  });
  return response.data;
};

export const getPopularItem = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<
  ApiResponse<Pagination<ItemCardType[] | [], 'itemPreviewList'>>
> => {
  const params: Record<string, number> = { page, size };

  const response = await instance.get(API_DOMAINS.HOME_POPULAR, {
    params,
  });
  return response.data;
};

export const getCloseDeadlineItem = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<
  ApiResponse<Pagination<ItemCardType[] | [], 'itemPreviewList'>>
> => {
  const params: Record<string, number> = { page, size };

  const response = await instance.get(API_DOMAINS.HOME_CLOSE_DEADLINE, {
    params,
  });
  return response.data;
};
