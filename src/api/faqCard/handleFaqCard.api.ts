import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS, SELLER_API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import {
  FaqCardDetailResponse,
  FaqCardRequestType,
  QuestionCardListType,
} from '@/types/common/FaqCardType.types';
import { FaqQuestion } from '@/types/common/ItemType.types';

export const postFaqCard = async ({
  sellerId,
  faqCategoryId,
  itemId,
  data,
}: FaqCardRequestType) => {
  const response = await instance.post<ApiResponse<FaqCardDetailResponse>>(
    generateApiPath(SELLER_API_DOMAINS.SELLER_MY_POST_FAQ_CARD, { itemId }),
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
    generateApiPath(SELLER_API_DOMAINS.SELLER_MY_HANDLE_FAQ_CARD, {
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

export const deleteFaqCard = async ({
  itemId,
  faqCardId,
}: {
  itemId: number;
  faqCardId: number;
}) => {
  const response = await instance.delete<ApiResponse<{ id: 'number' }>>(
    generateApiPath(SELLER_API_DOMAINS.SELLER_MY_HANDLE_FAQ_CARD, {
      itemId,
      faqCardId,
    })
  );
  return response.data.result;
};

export const patchFaqPin = async ({
  itemId,
  faqCardId,
  isPinned,
}: {
  itemId: number;
  faqCardId: number;
  isPinned: boolean;
}) => {
  const response = await instance.patch<ApiResponse<FaqQuestion>>(
    generateApiPath(SELLER_API_DOMAINS.SELLER_MY_FAQ_PIN, {
      itemId,
      faqCardId,
    }),
    {},
    { params: { isPinned } }
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
  const response = await instance.get<ApiResponse<FaqCardDetailResponse>>(
    generateApiPath(SELLER_API_DOMAINS.SELLER_MY_GET_FAQ_CARD_DETAIL, {
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

interface FaqCardListParams {
  sellerId: number;
  itemId: number;
  faqCategoryId: number | null;
  page?: number;
  size?: number;
}

export const getFaqCardByCategory = async ({
  sellerId,
  itemId,
  faqCategoryId,
  page = 1,
  size = 10,
}: FaqCardListParams) => {
  const url = generateApiPath(API_DOMAINS.GET_FAQ_CARDS, {
    sellerId,
    itemId,
  });

  const { data } = await instance.get<
    ApiResponse<Pagination<FaqCardDetailResponse | [], 'faqCardList'>>
  >(url, {
    params: {
      faqCategoryId,
      page,
      size,
    },
  });

  return data.result;
};
