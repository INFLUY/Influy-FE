import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllQuestions } from '@/api/talkBox/handleTalkBox.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetAllQuestions = ({
  questionCategoryId,
  isAnswered,
  size = 10,
}: {
  questionCategoryId: number;
  isAnswered: boolean;
  size?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.SELLER_ALL_QUESTIONS_IN_CATEGORY,
      questionCategoryId,
      isAnswered,
    ],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      getAllQuestions({
        questionCategoryId,
        isAnswered,
        page: pageParam,
        size,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages?.length ?? 0;
      const totalPage = lastPage?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 15 * 1000, // 15초
  });
};
