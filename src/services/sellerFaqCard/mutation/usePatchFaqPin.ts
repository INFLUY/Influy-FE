import { patchFaqPin } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchFaqPin = ({
  faqCategoryId,
  onSuccessCallback,
}: {
  faqCategoryId: number;
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({
      itemId,
      faqCardId,
      isPinned,
    }: {
      itemId: number;
      faqCardId: number;
      isPinned: boolean;
    }) => patchFaqPin({ itemId, faqCardId, isPinned }),
    onSuccess: (data, variables) => {
      onSuccessCallback?.();
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.SELLER_FAQ_CARD,
          variables.itemId,
          sellerId,
          data?.id,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.SELLER_FAQ_CARD_QUESTION,
          {
            sellerId,
            itemId: variables.itemId,
            faqCategoryId,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAQ_CARD_LIST, faqCategoryId],
      });
      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
