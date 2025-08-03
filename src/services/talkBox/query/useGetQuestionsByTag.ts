import { useInfiniteQuery } from '@tanstack/react-query';
import { getQuestionsByTag } from '@/api/talkBox/handleTalkBox.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetQuestionsByTag = ({
  questionTagId,
  isAnswered,
  size = 10,
}: {
  questionTagId: number | null;
  isAnswered: boolean;
  size?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.SELLER_QUESTIONS_BY_TAG, questionTagId, isAnswered],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      getQuestionsByTag({
        questionTagId,
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
      return undefined; // hasNextPage: false
    },
    initialPageParam: 1,
    enabled: false, // 자동 실행 방지
    staleTime: 15 * 1000, // 15초
  });
};
