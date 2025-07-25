import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';
import { TalkBoxOpenStatus } from '@/types/common/ItemType.types';

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
