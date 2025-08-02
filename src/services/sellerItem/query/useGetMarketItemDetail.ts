import { getSellerItemDetail } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMarketItemDetail = (sellerId: number, itemId: number) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_ITEM, { sellerId, itemId }],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async () => getSellerItemDetail({ sellerId, itemId }),
  });

  return query;
};
