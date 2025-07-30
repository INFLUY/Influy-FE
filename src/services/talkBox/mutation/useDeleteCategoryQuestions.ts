import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategoryQuestions } from '@/api/talkBox/handleTalkBox.api';
import { QUERY_KEYS } from '@/constants/api';

export const useDeleteCategoryQuestions = ({
  itemId,
  questionCategoryId,
  onSuccessCallback,
}: {
  itemId: number;
  questionCategoryId: number;
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { questionIdList: number[]; tagIds: number[] }) =>
      deleteCategoryQuestions({
        itemId,
        questionCategoryId,
        questionIdList: payload.questionIdList,
      }),
    onSuccess: (_data, variables) => {
      if (onSuccessCallback) onSuccessCallback();

      const keysToInvalidate = [
        [
          QUERY_KEYS.SELLER_ALL_QUESTIONS_IN_CATEGORY,
          questionCategoryId,
          false,
        ],
        [QUERY_KEYS.SELLER_QUESTION_TAGS, questionCategoryId, false],
        [QUERY_KEYS.SELLER_CATEGORY_QUESTION_COUNTS, questionCategoryId],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      // tagIds에 해당하는 쿼리만 invalidate
      variables.tagIds.forEach((tagId) => {
        queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.SELLER_QUESTIONS_BY_TAG, tagId, false],
        });
      });
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
