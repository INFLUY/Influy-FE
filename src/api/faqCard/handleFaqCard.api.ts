import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { FaqCardRequestType } from '@/types/common/FaqCardType.types';

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
        itemId,
      },
    }
  );
  return response.data;
};
