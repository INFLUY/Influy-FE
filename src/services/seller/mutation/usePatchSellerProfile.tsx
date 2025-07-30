import { patchSellerMyProfile } from '@/api/sellerMyProfile/handleSellerMyProfile.api';
import { QUERY_KEYS } from '@/constants/api';
import { SellerEditProfileType } from '@/types/seller/SellerProfile.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchSellerProfile = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: SellerEditProfileType }) =>
      patchSellerMyProfile({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_PROFILE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_MARKET],
      });
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
