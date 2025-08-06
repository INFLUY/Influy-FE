import { postFaqCard } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { FaqCardRequestType } from '@/types/common/FaqCardType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostFaqCard = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({
      sellerId,
      faqCategoryId,
      itemId,
      data,
    }: FaqCardRequestType) =>
      postFaqCard({ sellerId, faqCategoryId, itemId, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_FAQ_CARD, variables.itemId, sellerId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_FAQ_CARD, sellerId],
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
        queryKey: [QUERY_KEYS.FAQ_CARD_LIST, variables.faqCategoryId],
      });
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
