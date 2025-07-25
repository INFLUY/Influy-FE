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

  return JSON.parse(response.data.result.viewList); // "[사이즈, 세탁]" → ["사이즈", "세탁"]
};
