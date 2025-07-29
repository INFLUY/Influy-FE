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
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();

      // TODO: SELLER_QUESTIONS_BY_TAG 전체 invalidate 하지 말고 삭제한 질문들의 tag만 invalidate 하기
      const keysToInvalidate = [
        [
          QUERY_KEYS.SELLER_ALL_QUESTIONS_IN_CATEGORY,
          questionCategoryId,
          false,
        ],
        [QUERY_KEYS.SELLER_QUESTION_TAGS, questionCategoryId, false],
        [QUERY_KEYS.SELLER_CATEGORY_QUESTION_COUNTS, questionCategoryId],
        [QUERY_KEYS.SELLER_QUESTIONS_BY_TAG],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
