import { getPopularItem } from '@/api/home/handleHomeItemList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useGetPopularItem = ({ size = 10 }: { size?: number }) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.HOME_POPULAR, size],
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const [, size] = queryKey as [string, number];

      return getPopularItem({
        page: pageParam,
        size,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages?.length ?? 0;
      const totalPage = lastPage?.result?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  return query;
};
