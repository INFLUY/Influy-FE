import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import {
  ItemOverviewDTO,
  TalkBoxOpenedListDTO,
  TalkBoxOpenStatus,
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
