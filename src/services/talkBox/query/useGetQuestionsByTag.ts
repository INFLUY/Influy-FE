import { useInfiniteQuery } from '@tanstack/react-query';
import { getQuestionsByTag } from '@/api/talkBox/handleTalkBox.api';
import { QUERY_KEYS } from '@/constants/api';

interface UseGetQuestionsByTagParams {
  itemId: number;
  questionTagId: number;
  isAnswered?: boolean;
  size?: number;
  sort?: string[];
}

export const useGetQuestionsByTag = ({
  itemId,
  questionTagId,
  isAnswered = true,
  size = 10,
  sort,
}: UseGetQuestionsByTagParams) => {
  return useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.SELLER_QUESTION_BY_TAG,
      itemId,
      questionTagId,
      isAnswered,
      size,
      sort,
    ],
    queryFn: ({ pageParam = 0 }) =>
      getQuestionsByTag({
        itemId,
        questionTagId,
        isAnswered,
        page: pageParam,
        size,
        sort,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      if (nextPage < lastPage.totalPage) {
        return nextPage;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};
