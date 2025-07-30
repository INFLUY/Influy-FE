import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import {
  ItemOverviewDTO,
  TalkBoxOpenedListDTO,
  TalkBoxOpenStatus,
  TalkBoxCommentDTO,
} from '@/types/common/ItemType.types';
import { SELLER_API_DOMAINS } from '@/constants/api';

export const fetchItemOverview = async ({
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

export const fetchTalkBoxOpened = async (): Promise<TalkBoxOpenedListDTO> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.TALKBOX_OPENED_ITEMS)
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
    generateApiPath(SELLER_API_DOMAINS.SELLER_TALKBOX_OPEN_STATUS, {
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

export const fetchTalkBoxDefaultComment = async (
  itemId: number
): Promise<TalkBoxCommentDTO> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_TALKBOX_COMMENT, { itemId })
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
    generateApiPath(SELLER_API_DOMAINS.PATCH_TALKBOX_DEFAULT_COMMENT, {
      itemId,
    }),
    data
  );
};
