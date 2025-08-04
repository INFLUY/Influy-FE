import { getFaqCategory } from '@/api/faqCategory/handleFaqCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { CategoryType } from '@/types/common/CategoryType.types';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export const useGetItemFaqCategory = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}): UseSuspenseQueryResult<CategoryType[] | [], Error> => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_LINKS, sellerId],
    queryFn: async () => {
      const res = await getFaqCategory({ sellerId, itemId });
      return res?.viewList;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
