import { getRecommendedItem } from '@/api/sellerItem/handleHomeItemList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useGetRecommendedItem = ({
  categoryId,
  size = 10,
}: {
  categoryId: number | null;
  size?: number;
}) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.HOME_RECOMMEND, categoryId, size],
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const [, categoryId, size] = queryKey as [string, number | null, number];

      return getRecommendedItem({
        page: pageParam,
        size,
        categoryId,
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
