import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS, SELLER_API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import {
  ItemDetail,
  ItemPostDetail,
  ItemSortType,
  SellerItemPreviewList,
} from '@/types/common/ItemType.types';

import {
  ItemOverviewDTO,
  TalkBoxOpenedListDTO,
  TalkBoxOpenStatusType,
  TalkBoxCommentDTO,
  TalkBoxOpenStatusResponse,
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
  sortType?: ItemSortType;
  onGoing: boolean;
  page: number;
  size: number;
}) => {
  const params: Record<string, any> = {
    sellerId,
    archive,
    onGoing,
    page,
    size,
  };

  if (sortType !== null) {
    params.sortType = sortType;
  }

  const response = await instance.get<
    ApiResponse<
      Pagination<SellerItemPreviewList[] | [], 'itemPreviewList'> & {
        sortType: ItemSortType;
      }
    >
  >(generateApiPath(API_DOMAINS.SELLER_MARKET_ITEMS, { sellerId }), {
    params,
  });
  return response.data.result;
};

export const postItem = async (data: ItemPostDetail) => {
  const response = await instance.post<ApiResponse<{ itemId: number }>>(
    SELLER_API_DOMAINS.SELLER_POST_ITEM,
    data
  );
  return response.data.result;
};

export const patchItem = async (data: ItemPostDetail, itemId: number) => {
  const response = await instance.put<ApiResponse<{ itemId: number }>>(
    generateApiPath(SELLER_API_DOMAINS.SELLER_HANDLE_ITEM, { itemId }),
    data
  );
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

export const getItemOverview = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}): Promise<ItemOverviewDTO> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.ITEM_OVERVIEW, { sellerId, itemId })
  );
  return response.data.result ?? null;
};

export const getTalkBoxOpened = async (): Promise<TalkBoxOpenedListDTO> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.TALK_BOX_OPENED_ITEMS)
  );
  return response.data.result;
};

export const postTalkBoxOpenStatus = async ({
  itemId,
  openStatus,
}: {
  itemId: number;
  openStatus: TalkBoxOpenStatusType;
}): Promise<TalkBoxOpenStatusResponse> => {
  const response = await instance.post(
    generateApiPath(SELLER_API_DOMAINS.SELLER_TALK_BOX_OPEN_STATUS, {
      itemId,
    }),
    null,
    {
      params: {
        openStatus,
      },
    }
  );

  return response.data.result;
};

export const getTalkBoxDefaultComment = async (
  itemId: number
): Promise<TalkBoxCommentDTO> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_TALK_BOX_COMMENT, { itemId })
  );
  return response.data.result;
};

interface PatchTalkBoxDefaultCommentRequest {
  talkBoxComment: string;
}

export const patchTalkBoxDefaultComment = async ({
  itemId,
  data,
}: {
  itemId: number;
  data: PatchTalkBoxDefaultCommentRequest;
}): Promise<void> => {
  await instance.patch(
    generateApiPath(SELLER_API_DOMAINS.PATCH_TALK_BOX_DEFAULT_COMMENT, {
      itemId,
    }),
    data
  );
};
