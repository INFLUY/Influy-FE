import { getPrimaryAnnouncement } from '@/api/announcement/handleAnnouncement.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPrimaryAnnouncement = (sellerId: number) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_PRIMARY_ANNOUNCEMENT, sellerId],
    queryFn: async () => {
      const response = await getPrimaryAnnouncement({ sellerId });
      return response ?? null;
    },
  });

  return query;
};
