import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { fetchQuestionTagsByCategory } from '@/api/talkBox/handleQuestionTag.api';

export const useGetQuestionTags = ({
  questionCategoryId,
  isAnswered,
}: {
  questionCategoryId: number;
  isAnswered: boolean;
}) => {
  const { data } = useQuery({
    queryKey: [
      QUERY_KEYS.SELLER_QUESTION_CATEGORY,
      questionCategoryId,
      isAnswered,
    ],
    queryFn: () =>
      fetchQuestionTagsByCategory({ questionCategoryId, isAnswered }),
  });

  return { data };
};
