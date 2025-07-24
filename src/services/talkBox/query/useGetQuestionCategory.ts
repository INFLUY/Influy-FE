import { useSuspenseQuery } from '@tanstack/react-query';
import { getQuestionCategories } from '@/api/questionCategory/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetQuestionCategory = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_QUESTION_CATEGORY, sellerId, itemId],
    queryFn: () => getQuestionCategories({ sellerId, itemId }),
  });

  return { questionCategories: data };
};
