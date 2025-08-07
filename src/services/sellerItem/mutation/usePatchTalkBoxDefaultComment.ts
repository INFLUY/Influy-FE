import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchTalkBoxDefaultComment } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';

export const usePatchTalkBoxDefaultComment = (
  itemId: number,
  onSuccessCallback?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) =>
      patchTalkBoxDefaultComment({ itemId, data: { talkBoxComment: comment } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_TALK_BOX_COMMENT, itemId],
      });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      // TODO: 에러 처리 로직 추가
    },
  });
};
