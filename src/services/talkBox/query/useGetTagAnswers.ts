import { useQuery } from '@tanstack/react-query';
import { getTagAnswers } from '@/api/talkBox/handleSellerTalkBoxAnswer';
import { QUERY_KEYS } from '@/constants/api';

export const useGetTagAnswers = ({
  itemId,
  questionCategoryId,
  questionTagId,
}: {
  itemId: number;
  questionCategoryId: number;
  questionTagId: number;
}) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.SELLER_TAG_ANSWER_LIST,
      itemId,
      questionCategoryId,
      questionTagId,
    ],
    queryFn: () => getTagAnswers({ itemId, questionCategoryId, questionTagId }),
    enabled: !itemId && !questionCategoryId && !questionTagId,
  });
};
