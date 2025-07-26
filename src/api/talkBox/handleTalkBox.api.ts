import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';
import { QuestionResponse } from '@/types/seller/TalkBox.types';

export const getAllQuestions = async ({
  questionCategoryId,
  isAnswered,
  page = 0,
  size = 10,
}: {
  questionCategoryId: number;
  isAnswered: boolean;
  page?: number;
  size?: number;
}): Promise<QuestionResponse> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_ALL_QUESTIONS_IN_CATEGORY, {
      questionCategoryId,
    }),
    {
      params: {
        isAnswered,
        page,
        size,
      },
    }
  );

  return response.data.result;
};
