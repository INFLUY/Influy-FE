import { getLikedSellerList } from '@/api/likes/handleSellerLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetLikedSellerList = ({
  size = 10,
}: { size?: number } = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.LIKED_SELLERS],
    staleTime: 3 * 60 * 1000,
    queryFn: async ({ pageParam = 1 }) => {
      return getLikedSellerList({
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
};
