// swagger 질문 태그(소분류)

import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';
import { CategoryTagsDTO } from '@/types/common/TalkBox.types';

export const getQuestionTagsByCategory = async ({
  questionCategoryId,
  isAnswered,
}: {
  questionCategoryId: number;
  isAnswered: boolean;
}): Promise<CategoryTagsDTO[]> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_TALK_BOX_CATEGORY_TAGS, {
      questionCategoryId,
    }),
    {
      params: {
        isAnswered,
      },
    }
  );
  return response.data.result ?? null;
};
