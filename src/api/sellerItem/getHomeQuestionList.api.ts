import { SELLER_API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import { instance } from '../axiosInstance';
import { SellerHomeItemStatus } from '@/types/common/ItemType.types';

export const getHomeQuestionList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<ApiResponse<Pagination<SellerHomeItemStatus | [], 'itemList'>>> => {
  const response = await instance.get(
    SELLER_API_DOMAINS.SELLR_MY_HOME_QUESTIONS,
    {
      params: { page, size },
    }
  );
  return response.data;
};
