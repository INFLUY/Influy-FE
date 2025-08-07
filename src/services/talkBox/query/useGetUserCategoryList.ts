import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserCategoryList } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetUserCategoryList = (itemId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.TALK_BOX_CATEGORY, itemId],
    queryFn: () => getUserCategoryList(itemId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000,
  });
};
