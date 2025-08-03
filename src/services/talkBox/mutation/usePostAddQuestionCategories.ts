import { useMutation } from '@tanstack/react-query';
import { postAddQuestionCategories } from '@/api/talkBox/handleQuestionCategory.api';
import { handleReactQueryError } from '@/utils/handleError';

export const usePostAddQuestionCategories = ({
  itemId,
}: {
  itemId: number;
}) => {
  return useMutation({
    mutationFn: async (categoryList: string[]) => {
      const res = await postAddQuestionCategories({ itemId, categoryList });
      return res.generatedNameList;
    },
    onSuccess: () => {},
    onError: handleReactQueryError,
  });
};
