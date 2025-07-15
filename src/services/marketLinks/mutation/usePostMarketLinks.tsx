import { postMarketLink } from '@/api/marketLink/handleMarketLink.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';
import { BaseLinkType } from '@/types/seller/LinkType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostMarketLinks = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const sellerId = useStrictSellerId();

  return useMutation({
    mutationFn: (data: BaseLinkType) => postMarketLink({ data }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SELLER_MARKET_LINKS, sellerId],
      });
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
