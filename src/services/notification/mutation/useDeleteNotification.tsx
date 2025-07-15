import { deleteNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useAuthStore();

  return useMutation({
    mutationFn: ({ announcementId }: { announcementId: number }) =>
      deleteNotification({ announcementId }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SELLER_PRIMARY_ANNOUNCEMENT, sellerId],
      });
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
