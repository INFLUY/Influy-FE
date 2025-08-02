import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import {
  ItemDetail,
  ItemSortType,
  SellerItemPreviewList,
} from '@/types/common/ItemType.types';

export const getSellerItems = async ({
  sellerId,
  archive,
  sortType,
  onGoing,
  page,
  size,
}: {
  sellerId: number;
  archive: boolean;
  sortType: ItemSortType;
  onGoing: boolean;
  page: number;
  size: number;
}) => {
  const response = await instance.get<
    ApiResponse<
      Pagination<SellerItemPreviewList[] | [], 'itemPreviewList'> & {
        sortType: ItemSortType;
      }
    >
  >(generateApiPath(API_DOMAINS.SELLER_MARKET_ITEMS, { sellerId }), {
    params: { archive, page, size, sortType, onGoing },
  });
  return response.data.result;
};

export const getSellerItemDetail = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const response = await instance.get<ApiResponse<ItemDetail>>(
    generateApiPath(API_DOMAINS.SELLER_MARKET_ITEM, { sellerId, itemId })
  );
  return response.data.result;
};
