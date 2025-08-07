import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBulkAnswer } from '@/api/talkBox/handleSellerTalkBoxAnswer';
import { QUERY_KEYS } from '@/constants/api';
import { useHandleReactQueryError } from '@/hooks/useHandleError';

export const usePostBulkAnswer = ({
  itemId,
  questionCategoryId,
  onSuccessCallback,
  tagsToInvalidate,
}: {
  itemId: number;
  questionCategoryId: number;
  onSuccessCallback?: (answeredCnt: number) => void;
  tagsToInvalidate?: number[];
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { questionIdList: number[]; answerContent: string }) =>
      postBulkAnswer({ itemId, questionCategoryId, data }),
    onSuccess: (res) => {
      const keysToInvalidate = [
        [
          QUERY_KEYS.SELLER_ALL_QUESTIONS_IN_CATEGORY,
          questionCategoryId,
          false,
        ],
        [QUERY_KEYS.SELLER_QUESTION_TAGS, questionCategoryId, false],
        [QUERY_KEYS.SELLER_CATEGORY_QUESTION_COUNTS, questionCategoryId],
        [QUERY_KEYS.SELLER_TALK_BOX_OPENED_ITEMS],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      // tagIds에 해당하는 쿼리만 invalidate
      tagsToInvalidate?.forEach((tagId) => {
        queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.SELLER_QUESTIONS_BY_TAG, tagId, false],
        });
      });

      if (onSuccessCallback) {
        onSuccessCallback(res.answeredCnt);
      }
    },
    onError: useHandleReactQueryError,
  });
};
