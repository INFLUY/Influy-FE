import { patchNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';
import { NoticePostType } from '@/types/common/NoticeType.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const sellerId = useStrictSellerId();

  return useMutation({
    mutationFn: ({
      data,
      announcementId,
      isPrimary,
    }: {
      data?: NoticePostType;
      announcementId: number;
      isPrimary?: boolean;
    }) => patchNotification({ data, announcementId, isPrimary }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      // TODO
    },
  });
};
