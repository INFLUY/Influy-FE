import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserQuestion } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';

interface UsePostUserQuestionProps {
  itemId: number;
  questionCategoryId: number;
  onSuccessCallback?: () => void;
}

export const usePostUserQuestion = ({
  itemId,
  questionCategoryId,
  onSuccessCallback,
}: UsePostUserQuestionProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      postUserQuestion({ itemId, questionCategoryId, content }),
    onSuccess: () => {
      // TODO: invalidate
      //   queryClient.invalidateQueries([
      //     QUERY_KEYS.SELLER_ALL_QUESTIONS_IN_CATEGORY,
      //     questionCategoryId,
      //     false,
      //   ]);
      //   queryClient.invalidateQueries([
      //     QUERY_KEYS.SELLER_QUESTION_TAGS,
      //     questionCategoryId,
      //     false,
      //   ]);
      //   queryClient.invalidateQueries([
      //     QUERY_KEYS.SELLER_CATEGORY_QUESTION_COUNTS,
      //     questionCategoryId,
      //   ]);

      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error('질문 등록 실패:', error);
    },
  });
};
