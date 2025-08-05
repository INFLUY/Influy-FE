import { useInfiniteQuery } from '@tanstack/react-query';
import { getFaqCardByCategory } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';

interface UseUserFaqCardListParams {
  sellerId: number;
  itemId: number;
  faqCategoryId: number | null;
  size?: number;
}

export const useGetFaqCardByCategory = ({
  sellerId,
  itemId,
  faqCategoryId,
  size = 10,
}: UseUserFaqCardListParams) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.FAQ_CARD_LIST, faqCategoryId],
    queryFn: ({ pageParam = 1 }) =>
      getFaqCardByCategory({
        sellerId,
        itemId,
        faqCategoryId,
        page: pageParam,
        size,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPage = lastPage?.totalPage ?? 0;
      const currentPage = allPages.length;

      if (currentPage < totalPage) return currentPage + 1;
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 10000,
    enabled: faqCategoryId !== null,
  });
};
