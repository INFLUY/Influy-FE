import { getFaqCategory } from '@/api/faqCategory/handleFaqCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { CategoryType } from '@/types/common/CategoryType.types';
import {
  useSuspenseQuery,
  useQuery,
  UseSuspenseQueryResult,
  UseQueryResult,
} from '@tanstack/react-query';

export const useGetItemFaqCategory = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}): UseSuspenseQueryResult<CategoryType[] | [], Error> => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_FAQ_CATEGORIES, { sellerId, itemId }],
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
export const useGetItemFaqCategoryQuery = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SELLER_FAQ_CATEGORIES, { sellerId, itemId }],
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
