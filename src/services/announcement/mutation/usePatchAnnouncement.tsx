import { patchAnnouncement } from '@/api/announcement/handleAnnouncement.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { BaseAnnouncement } from '@/types/common/AnnouncementType.types';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchAnnouncement = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({
      data,
      announcementId,
      isPrimary,
    }: {
      data?: BaseAnnouncement;
      announcementId: number;
      isPrimary?: boolean;
    }) => patchAnnouncement({ data, announcementId, isPrimary }),
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
