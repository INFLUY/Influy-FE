import { API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import { HomeItemPreviewList } from '@/types/common/ItemType.types';

export const getItemRecommend = async ({
  page,
  size,
  categoryId,
}: {
  page: number;
  size: number;
  categoryId: number | null;
}): Promise<
  ApiResponse<Pagination<HomeItemPreviewList[] | [], 'itemPreviewList'>>
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
