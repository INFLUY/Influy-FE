import { getPrimaryNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPrimaryNotification = (sellerId: number) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_PRIMARY_ANNOUNCEMENT, sellerId],
    queryFn: async () => {
      const response = await getPrimaryNotification({ sellerId });
      return response ?? null;
    },
  });

  return query;
};
