import { useMutation } from '@tanstack/react-query';
import { postBulkAnswer } from '@/api/talkBox/handleSellerTalkBoxAnswer';

export const usePostBulkAnswer = ({
  itemId,
  questionCategoryId,
  onSuccessCallback,
}: {
  itemId: number;
  questionCategoryId: number;
  onSuccessCallback?: (answeredCnt: number) => void;
}) => {
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
