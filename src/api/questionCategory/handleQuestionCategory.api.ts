import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';
import { QuestionCategoryDTO } from '@/types/seller/TalkBox.types';

export const getQuestionCategories = async ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}): Promise<QuestionCategoryDTO[]> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_QUESTION_CATEGORY, {
      sellerId,
      itemId,
    })
  );
  return response.data.result.viewList;
};
