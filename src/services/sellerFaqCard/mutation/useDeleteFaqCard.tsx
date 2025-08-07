import { deleteFaqCard } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteFaqCard = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({
      itemId,
      faqCardId,
    }: {
      itemId: number;
      faqCardId: number;
      faqCategoryId: number;
    }) => deleteFaqCard({ faqCardId, itemId }),
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
            faqCategoryId: variables.faqCategoryId,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAQ_CARD_LIST, variables.faqCategoryId],
      });
    },
    onError: useHandleReactQueryError,
  });
};
