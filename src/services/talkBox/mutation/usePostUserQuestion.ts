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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_TALK_BOX_HISTORY, itemId],
      });

      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error('질문 등록 실패:', error);
    },
  });
};
