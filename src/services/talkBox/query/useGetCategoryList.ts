import { useSuspenseQuery } from '@tanstack/react-query';
import { getCategoryList } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetCategoryList = (itemId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_CATEGORY_LIST, itemId],
    queryFn: () => getCategoryList({ itemId }),
  });
};
