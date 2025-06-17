import { deleteNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ announcementId }: { announcementId: number }) =>
      deleteNotification({ announcementId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_ANNOUNCEMENT],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      // TODO
    },
  });
};
