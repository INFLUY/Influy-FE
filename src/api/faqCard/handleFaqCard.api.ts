import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import {
  FaqCardDetailReponse,
  FaqCardRequestType,
} from '@/types/common/FaqCardType.types';

export const postFaqCard = async ({
  sellerId,
  faqCategoryId,
  itemId,
  data,
}: FaqCardRequestType) => {
  const response = await instance.post(
    generateApiPath(API_DOMAINS.SELLER_MY_POST_FAQ_CARD, { itemId }),
    data,
    {
      params: {
        sellerId,
        faqCategoryId,
      },
    }
  );
  return response.data;
};

export const patchFaqCard = async ({
  sellerId,
  itemId,
  faqCardId,
  data,
}: FaqCardRequestType & { faqCardId: number }) => {
  const response = await instance.patch(
    generateApiPath(API_DOMAINS.SELLER_MY_HANDLE_FAQ_CARD, {
      itemId,
      faqCardId,
    }),
    data,
    {
      params: {
        sellerId,
      },
    }
  );
  return response.data;
};

export const getFaqCardDetail = async ({
  sellerId,
  itemId,
  faqCardId,
}: {
  sellerId: number;
  itemId: number;
  faqCardId: number;
}): Promise<ApiResponse<FaqCardDetailReponse>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_MY_GET_FAQ_CARD_DETAIL, {
      sellerId,
      itemId,
      faqCardId,
    })
  );
  return response.data;
};
