import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBulkAnswer } from '@/api/talkBox/handleSellerTalkBoxAnswer';
import { QUERY_KEYS } from '@/constants/api';

export const usePostBulkAnswer = ({
  itemId,
  questionCategoryId,
  onSuccessCallback,
}: {
  itemId: number;
  questionCategoryId: number;
  onSuccessCallback?: (answeredCnt: number) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { questionIdList: number[]; answerContent: string }) =>
      postBulkAnswer({ itemId, questionCategoryId, data }),
    onSuccess: (res) => {
      if (onSuccessCallback) {
        onSuccessCallback(res.answeredCnt);
      }
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
