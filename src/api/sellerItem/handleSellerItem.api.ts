import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { ItemDetail, SellerItemsResponse } from '@/types/common/ItemType.types';

import {
  ItemOverviewDTO,
  TalkBoxOpenedListDTO,
  TalkBoxOpenStatus,
  TalkBoxCommentDTO,
} from '@/types/common/ItemType.types';
import { SELLER_API_DOMAINS } from '@/constants/api';

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
  sortType?: 'END_DATE' | 'CREATE_DATE';
  onGoing: boolean;
  page: number;
  size: number;
}): Promise<ApiResponse<SellerItemsResponse>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_MARKET_ITEMS, { sellerId }),
    {
      params: { archive, page, size, sortType, onGoing },
    }
  );
  return response.data;
};

export const getSellerItemDetail = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}): Promise<ApiResponse<ItemDetail>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_MARKET_ITEM, { sellerId, itemId })
  );
  return response.data;
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
export interface TalkBoxOpenStatusDTO {
  // TODO: 이거모임
  itemId: number;
  status: TalkBoxOpenStatus;
}

export const postTalkBoxOpenStatus = async ({
  itemId,
  openStatus,
}: {
  itemId: number;
  openStatus: TalkBoxOpenStatus;
}): Promise<TalkBoxOpenStatusDTO> => {
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
