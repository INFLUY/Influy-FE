import { getRecommendedItem } from '@/api/home/handleHomeItemList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetRecommendedItem = ({
  categoryId,
  size = 10,
  enabled = true,
}: {
  categoryId: number | null;
  size?: number;
  enabled?: boolean;
}) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.HOME_RECOMMEND, categoryId],
    staleTime: 1 * 60 * 1000,
    gcTime: 2 * 60 * 1000,
    enabled,
    queryFn: async ({ pageParam = 1 }) => {
      return getRecommendedItem({
        page: pageParam,
        size,
        categoryId,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages?.length ?? 0;
      const totalPage = lastPage?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  return query;
};
