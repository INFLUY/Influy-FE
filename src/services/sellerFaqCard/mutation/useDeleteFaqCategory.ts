import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFaqCategory } from '@/api/faqCategory/handleFaqCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';

export const useDeleteFaqCategory = ({
  itemId,
  onSuccessCallback,
}: {
  itemId: number;
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({ categoryId }: { categoryId: number }) =>
      deleteFaqCategory({ itemId, id: categoryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.SELLER_FAQ_CATEGORIES,
          { sellerId: sellerId, itemId },
        ],
      });
      onSuccessCallback?.();
    },
  });
};
