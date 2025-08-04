import { useSuspenseQuery } from '@tanstack/react-query';
import { getSellerOverview } from '@/api/sellerMyProfile/getMarket.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetSellerOverview = (sellerId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_OVERVIEW, sellerId],
    queryFn: () => getSellerOverview(sellerId),
    staleTime: 5 * 60 * 1000, // 5m
    gcTime: 10 * 60 * 1000, // 10m
  });
};
