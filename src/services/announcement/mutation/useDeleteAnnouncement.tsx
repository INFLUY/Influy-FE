import { deleteAnnouncement } from '@/api/announcement/handleAnnouncement.api';
import { QUERY_KEYS } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAnnouncement = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useAuthStore();

  return useMutation({
    mutationFn: ({ announcementId }: { announcementId: number }) =>
      deleteAnnouncement({ announcementId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_PRIMARY_ANNOUNCEMENT, sellerId],
      });
      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
