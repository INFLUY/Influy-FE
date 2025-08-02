import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getQuestionTagsByCategory } from '@/api/talkBox/handleQuestionTag.api';

export const useGetQuestionTags = ({
  questionCategoryId,
  isAnswered,
}: {
  questionCategoryId: number;
  isAnswered: boolean;
}) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.SELLER_QUESTION_TAGS, questionCategoryId, isAnswered],
    queryFn: () =>
      getQuestionTagsByCategory({ questionCategoryId, isAnswered }),
    staleTime: 15 * 1000, // 15초
  });

  return { data };
};
