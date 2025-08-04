import { postFaqCategory } from '@/api/faqCategory/handleFaqCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { CategoryType } from '@/types/common/CategoryType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CategoryPostType {
  category: string;
}

export const usePostItemFaqCategory = ({
  itemId,
  onSuccessCallback,
}: {
  itemId: number;
  onSuccessCallback?: (response: CategoryType) => void;
}) => {
  const queryClient = useQueryClient();
  const sellerId = useStrictId();

  return useMutation({
    mutationFn: (data: CategoryPostType) => postFaqCategory({ itemId, data }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_FAQ_CATEGORIES, { sellerId, itemId }],
      });
      if (res) {
        onSuccessCallback?.(res);
      }
    },
    onError: handleReactQueryError,
  });
};
