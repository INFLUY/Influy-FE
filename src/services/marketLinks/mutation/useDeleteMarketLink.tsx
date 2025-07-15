import { deleteMarketLink } from '@/api/marketLink/handleMarketLink.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';
import { useErrorStore } from '@/store/errorStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMarketLink = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const sellerId = useStrictSellerId();
  const showError = useErrorStore((state) => state.showError);

  return useMutation({
    mutationFn: (linkId: number) => deleteMarketLink({ linkId }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SELLER_MARKET_LINKS, sellerId],
      });
      onSuccessCallback?.();
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : '알 수 없는 에러가 발생했습니다.';
      showError(message);
    },
  });
};
