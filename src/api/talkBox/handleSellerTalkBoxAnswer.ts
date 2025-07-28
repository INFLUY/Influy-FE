// swagger 셀러 톡박스 답변
import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';
import { TagAnswerResponse } from '@/types/seller/TalkBox.types';

export const getTagAnswers = async ({
  itemId,
  questionCategoryId,
  questionTagId,
}: {
  itemId: number;
  questionCategoryId: number;
  questionTagId: number;
}): Promise<TagAnswerResponse> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_TAG_ANSWER_LIST, {
      itemId,
      questionCategoryId,
    }),
    {
      params: {
        questionTagId,
      },
    }
  );

  return response.data.result;
};
