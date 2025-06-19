import { patchNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import { NoticePostType } from '@/types/common/NoticeType.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useAuthStore();

  return useMutation({
    mutationFn: ({
      data,
      announcementId,
    }: {
      data: NoticePostType;
      announcementId: number;
    }) => patchNotification({ data, announcementId }),
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
