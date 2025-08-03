import { postAnnouncement } from '@/api/announcement/handleAnnouncement.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { BaseAnnouncement } from '@/types/common/AnnouncementType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostAnnouncement = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: (data: BaseAnnouncement) => postAnnouncement({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_PRIMARY_ANNOUNCEMENT, sellerId],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: handleReactQueryError,
  });
};
