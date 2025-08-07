import { patchFaqCategoryOrder } from '@/api/faqCategory/handleFaqCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CategoryPatchType {
  id: number;
  category: string;
}

export const usePatchFaqCategoryOrder = ({
  itemId,
  onSuccessCallback,
}: {
  itemId: number;
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  const sellerId = useStrictId();

  return useMutation({
    mutationFn: (ids: number[]) => patchFaqCategoryOrder({ itemId, ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.SELLER_FAQ_CATEGORIES,
          { sellerId: sellerId.sellerId, itemId },
        ],
      });

      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
