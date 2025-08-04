import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import {
  FaqCardDetailReponse,
  FaqCardRequestType,
  QuestionCardListType,
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
  return response.data.result;
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
  return response.data.result;
};

export const getFaqCardDetail = async ({
  sellerId,
  itemId,
  faqCardId,
}: {
  sellerId: number;
  itemId: number;
  faqCardId: number;
}) => {
  const response = await instance.get<ApiResponse<FaqCardDetailReponse>>(
    generateApiPath(API_DOMAINS.SELLER_MY_GET_FAQ_CARD_DETAIL, {
      sellerId,
      itemId,
      faqCardId,
    })
  );
  return response.data.result;
};

export const getFaqCardQuestionList = async ({
  size,
  page,
  sellerId,
  itemId,
  faqCategoryId,
}: {
  size: number;
  page: number;
  sellerId: number;
  itemId: number;
  faqCategoryId: number;
}) => {
  const response = await instance.get<
    ApiResponse<Pagination<QuestionCardListType[] | [], 'questionCardList'>>
  >(
    generateApiPath(API_DOMAINS.SELLER_GET_FAQ_QUESTIONS, {
      sellerId,
      itemId,
    }),
    { params: { page, size, faqCategoryId } }
  );
  return response.data.result;
};
