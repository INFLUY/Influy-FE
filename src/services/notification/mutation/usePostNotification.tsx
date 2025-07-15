import { postNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';
import { BaseNotice } from '@/types/common/NoticeType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const sellerId = useStrictSellerId();

  return useMutation({
    mutationFn: (data: BaseNotice) => postNotification({ data }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SELLER_PRIMARY_ANNOUNCEMENT, sellerId],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: handleReactQueryError,
  });
};
