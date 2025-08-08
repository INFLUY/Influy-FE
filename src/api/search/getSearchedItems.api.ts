import {
  ApiResponse,
  Pagination,
  PaginationType,
} from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import { ItemCardType } from '@/types/common/ItemType.types';
import { API_DOMAINS } from '@/constants/api';

export const getSearchedItems = async ({
  query,
  page,
  size,
}: PaginationType & { query: string }) => {
  const response = await instance.get<
    ApiResponse<Pagination<ItemCardType[] | [], 'itemPreviewList'>>
  >(API_DOMAINS.GET_SEARCHED_ITEMS, { params: { query, page, size } });
  return response.data.result;
};
