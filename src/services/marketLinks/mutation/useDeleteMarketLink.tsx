import { deleteMarketLink } from '@/api/marketLink/handleMarketLink.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMarketLink = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: (linkId: number) => deleteMarketLink({ linkId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MARKET_LINKS, sellerId],
      });
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
