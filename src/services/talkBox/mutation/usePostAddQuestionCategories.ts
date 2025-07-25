import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAddQuestionCategories } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';

export const usePostAddQuestionCategories = ({
  itemId,
}: {
  itemId: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryList: string[]) =>
      postAddQuestionCategories({ itemId, categoryList }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_QUESTION_CATEGORY, itemId],
      });
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
