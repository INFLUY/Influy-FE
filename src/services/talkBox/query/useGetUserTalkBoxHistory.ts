import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getUserTalkBoxHistory } from '@/api/talkBox/handleTalkBox.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetUserTalkBoxHistory = (itemId: number, size = 10) => {
  return useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEYS.USER_TALK_BOX_HISTORY, itemId],
    queryFn: ({ pageParam = 1 }) =>
      getUserTalkBoxHistory({ itemId, page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPage = lastPage?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined;
    },
  });
};
