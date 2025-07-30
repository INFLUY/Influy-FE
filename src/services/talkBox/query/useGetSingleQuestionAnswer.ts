// src/services/talkBox/query/useGetSingleQuestionAnswer.ts
import { useQuery } from '@tanstack/react-query';
import { getSingleQuestionAnswer } from '@/api/talkBox/handleTalkBox.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetSingleQuestionAnswer = ({
  itemId,
  questionCategoryId,
  questionTagId,
  questionId,
}: {
  itemId: number;
  questionCategoryId: number;
  questionTagId: number;
  questionId: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SELLER_SINGLE_QUESTION_ANSWER, questionId],
    queryFn: () =>
      getSingleQuestionAnswer({
        itemId,
        questionCategoryId,
        questionTagId,
        questionId,
      }),
    enabled:
      !!itemId && !!questionCategoryId && !!questionTagId && !!questionId,
  });
};
