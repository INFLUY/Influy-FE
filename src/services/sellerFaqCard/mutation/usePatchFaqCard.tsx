import { patchFaqCard } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { FaqCardRequestType } from '@/types/common/FaqCardType.types';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchFaqCard = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({
      sellerId,
      itemId,
      faqCardId,
      data,
    }: FaqCardRequestType & { faqCardId: number }) =>
      patchFaqCard({ sellerId, faqCardId, itemId, data }),
    onSuccess: (data, variables) => {
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
            faqCategoryId: data?.faqCategoryId,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAQ_CARD_LIST, data?.faqCategoryId],
      });
      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
