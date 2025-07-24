import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';
import { TalkBoxQuestionListResponse } from '@/types/seller/TalkBox.types';

export const getQuestionsByTag = async ({
  itemId,
  questionTagId,
  isAnswered = true,
  page = 0,
  size = 10,
  sort,
}: {
  itemId: number;
  questionTagId: number;
  isAnswered?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
}): Promise<TalkBoxQuestionListResponse> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_QUESTION_BY_TAG, {
      itemId,
      questionTagId,
    }),
    {
      params: {
        isAnswered,
        page,
        size,
        sort,
      },
    }
  );

  return response.data.result;
};
