import { getTrendingSeller } from '@/api/home/getTrendingSeller';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
export const useGetTrendingSeller = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.HOME_TRENDING_SELLER],
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    queryFn: async () => {
      const response = await getTrendingSeller();
      return response.sellerThumbnailList;
    },
  });

  return query;
};
