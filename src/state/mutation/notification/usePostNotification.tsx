import { postNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { NoticePostType } from '@/types/common/NoticeType.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoticePostType) => postNotification({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      // TODO
    },
  });
};
