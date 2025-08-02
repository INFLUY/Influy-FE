import { useSuspenseQuery } from '@tanstack/react-query';
import { getCategoryQuestionCounts } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetCategoryQuestionCounts = (questionCategoryId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_CATEGORY_QUESTION_COUNTS, questionCategoryId],
    queryFn: () => getCategoryQuestionCounts({ questionCategoryId }),
    staleTime: 15 * 1000, // 15초
  });
};
