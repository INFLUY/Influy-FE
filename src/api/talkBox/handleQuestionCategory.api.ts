//스웨거 질문 카테고리
import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { SELLER_API_DOMAINS } from '@/constants/api';

export const postGenerateQuestionCategory = async ({
  itemId,
}: {
  itemId: number;
}): Promise<string[]> => {
  const response = await instance.post(
    generateApiPath(SELLER_API_DOMAINS.SELLER_GENERATE_QUESTION_CATEGORY, {
      itemId,
    })
  );

  return response.data.result.generatedNameList;
};

export const postAddQuestionCategories = async ({
  itemId,
  categoryList,
}: {
  itemId: number;
  categoryList: string[];
}): Promise<string[]> => {
  const response = await instance.post(
    generateApiPath(SELLER_API_DOMAINS.SELLER_ADD_QUESTION_CATEGORIES, {
      itemId,
    }),
    {
      categoryList,
    }
  );

  return JSON.parse(response.data.result.viewList);
};

export const getCategoryQuestionCounts = async ({
  questionCategoryId,
}: {
  questionCategoryId: number;
}): Promise<{ waitingCnt: number; completedCnt: number }> => {
  const response = await instance.get(
    generateApiPath(SELLER_API_DOMAINS.SELLER_CATEGORY_QUESTION_COUNTS, {
      questionCategoryId,
    })
  );

  return response.data.result;
};
