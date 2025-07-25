import { patchNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { BaseNotice } from '@/types/common/NoticeType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({
      data,
      announcementId,
      isPrimary,
    }: {
      data?: BaseNotice;
      announcementId: number;
      isPrimary?: boolean;
    }) => patchNotification({ data, announcementId, isPrimary }),
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
