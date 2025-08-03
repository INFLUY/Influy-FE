import { API_DOMAINS } from '@/constants/api';
import {
  ApiResponse,
  Pagination,
  PaginationType,
} from '@/types/common/ApiResponse.types';
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
}) => {
  const params: Record<string, number> = { page, size };

  if (categoryId !== null) {
    params.categoryId = categoryId;
  }

  const response = await instance.get<
    ApiResponse<Pagination<ItemCardType[] | [], 'itemPreviewList'>>
  >(API_DOMAINS.HOME_RECOMMEND, {
    params,
  });
  return response.data.result;
};

export const getPopularItem = async ({ page, size }: PaginationType) => {
  const response = await instance.get<
    ApiResponse<Pagination<ItemCardType[] | [], 'itemPreviewList'>>
  >(API_DOMAINS.HOME_POPULAR, {
    params: { page, size },
  });
  return response.data.result;
};

export const getCloseDeadlineItem = async ({ page, size }: PaginationType) => {
  const response = await instance.get<
    ApiResponse<Pagination<ItemCardType[] | [], 'itemPreviewList'>>
  >(API_DOMAINS.HOME_CLOSE_DEADLINE, {
    params: { page, size },
  });
  return response.data.result;
};
