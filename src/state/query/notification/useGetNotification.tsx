import { getNotification } from '@/api/notification/handleNotification.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetNotification = (sellerId: number) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SELLER_ANNOUNCEMENT, sellerId],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      getNotification({ sellerId, page: pageParam, size: 5 }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLast) {
        return undefined;
      }
      return (allPages?.length || 0) + 1;
    },
    initialPageParam: 1,
    select: (data) => {
      return {
        announcements: data.pages.flatMap((page) => page.announcements),
        totalElements: data.pages[0]?.totalElements || 0,
        totalPages: data.pages[0]?.totalPage || 0,
        pageParams: data.pageParams,
      };
    },
  });

  return query;
};
