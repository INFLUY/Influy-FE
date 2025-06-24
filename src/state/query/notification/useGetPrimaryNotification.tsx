import { getPrimaryNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPrimaryNotification = ({
  sellerId,
}: {
  sellerId: number;
}) => {
  const query = useSuspenseQuery({
    queryFn: () => getPrimaryNotification({ sellerId }),
    queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
  });

  return query;
};
