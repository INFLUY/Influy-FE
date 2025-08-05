import { putSellerPublic } from '@/api/sellerMyProfile/putSellerPublic.api';
import { QUERY_KEYS } from '@/constants/api';
import { SellerPulicResponse } from '@/types/seller/SellerProfile.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePutSellerPublic = (
  onSuccessCallback?: (data: SellerPulicResponse) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ status }: { status: boolean }) =>
      putSellerPublic({ status }),
    onSuccess: (data) => {
      const homeQueryKeys = [
        QUERY_KEYS.HOME_CLOSE_DEADLINE,
        QUERY_KEYS.HOME_POPULAR,
        QUERY_KEYS.HOME_RECOMMEND,
        QUERY_KEYS.HOME_TRENDING_SELLER,
      ];

      homeQueryKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MARKET, data?.sellerId],
      });
      if (data) {
        onSuccessCallback?.(data);
      }
    },
    onError: handleReactQueryError,
  });
};
