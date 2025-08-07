import { getFaqCardQuestionList } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetItemFaqQuestionList = ({
  size = 10,
  sellerId,
  itemId,
  faqCategoryId,
}: {
  size?: number;
  sellerId: number | null;
  itemId: number;
  faqCategoryId: number | undefined;
}) => {
  const query = useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.SELLER_FAQ_CARD_QUESTION,
      { sellerId, itemId, faqCategoryId },
    ],
    queryFn: async ({ pageParam = 1 }) => {
      return getFaqCardQuestionList({
        page: pageParam,
        size,
        sellerId: sellerId!,
        itemId,
        faqCategoryId: faqCategoryId!,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages?.length ?? 0;
      const totalPage = lastPage?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: sellerId !== null && faqCategoryId !== undefined,
  });

  return query;
};
