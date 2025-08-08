import { getSearchedItems } from '@/api/search/getSearchedItems.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetSearchedItems = ({
  query,
  size = 10,
}: {
  query: string;
  size?: number;
}) => {
  const queryData = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCHED_ITEMS, { query, size }],
    staleTime: 20 * 1000,
    gcTime: 1 * 60 * 1000,
    queryFn: async ({ pageParam = 1 }) => {
      return getSearchedItems({
        query,
        page: pageParam,
        size,
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

  const totalElements = queryData.data?.pages?.[0]?.totalElements ?? 0;

  return {
    ...queryData,
    totalElements,
  };
};
