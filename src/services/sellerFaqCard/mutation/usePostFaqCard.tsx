import { postFaqCard } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';
import { FaqCardRequestType } from '@/types/common/FaqCardType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostFaqCard = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const sellerId = useStrictSellerId();

  return useMutation({
    mutationFn: ({
      sellerId,
      faqCategoryId,
      itemId,
      data,
    }: FaqCardRequestType) =>
      postFaqCard({ sellerId, faqCategoryId, itemId, data }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SELLER_FAQ_CARD, sellerId],
      });
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
