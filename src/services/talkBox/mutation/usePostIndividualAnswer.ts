import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postIndividualAnswer } from '@/api/talkBox/handleSellerTalkBoxAnswer';
import { QUERY_KEYS } from '@/constants/api';
import { handleReactQueryError } from '@/utils/handleError';

export const usePostIndividualAnswer = ({
  itemId,
  questionCategoryId,
  questionTagId,
  questionId,
  onSuccessCallback,
}: {
  itemId: number;
  questionCategoryId: number;
  questionTagId: number;
  questionId: number;
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerContent: string) =>
      postIndividualAnswer({
        itemId,
        questionCategoryId,
        questionTagId,
        questionId,
        answerContent,
      }),
    onSuccess: () => {
      const keysToInvalidate = [
        [
          QUERY_KEYS.SELLER_ALL_QUESTIONS_IN_CATEGORY,
          questionCategoryId,
          false,
        ],
        [QUERY_KEYS.SELLER_QUESTION_TAGS, questionCategoryId, false],
        [QUERY_KEYS.SELLER_CATEGORY_QUESTION_COUNTS, questionCategoryId],
        [QUERY_KEYS.SELLER_QUESTIONS_BY_TAG, questionTagId],
        [QUERY_KEYS.SELLER_SINGLE_QUESTION_ANSWER, questionId],
        [QUERY_KEYS.SELLER_TALK_BOX_OPENED_ITEMS],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: handleReactQueryError,
  });
};
