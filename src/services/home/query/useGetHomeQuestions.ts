import { getHomeQuestionList } from '@/api/home/getHomeQuestionList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetHomeQuestions = ({ size = 10 }: { size?: number } = {}) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SELLER_MY_HOME_QUESTIONS],
    staleTime: 3 * 60 * 1000,
    queryFn: async ({ pageParam = 1 }) => {
      return getHomeQuestionList({
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

  return query;
};
