import { getNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetNotification = () => {
  const query = useQuery({
    queryFn: () => getNotification(),
    queryKey: [QUERY_KEYS.SELLER_MY_ANNOUNCEMENT],
  });

  return query;
};
