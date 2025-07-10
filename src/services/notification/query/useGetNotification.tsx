import { getNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetNotification = (sellerId: number) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      getNotification({ sellerId, page: pageParam, size: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      // lastPage: 마지막으로 불러온 페이지의 데이터
      // allPages: 지금까지 불러온 모든 페이지의 배열
      const currentPage = allPages?.length ?? 0;
      const totalPage = lastPage?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined; // hasNextPage: false
    },
    initialPageParam: 1,
  });

  return query;
};
