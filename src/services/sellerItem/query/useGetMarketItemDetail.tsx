import { getSellerItemDetail } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMarketItemDetail = (sellerId: number, itemId: number) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_ITEM, sellerId, itemId],
    queryFn: async () => {
      const response = await getSellerItemDetail({ sellerId, itemId });
      return response?.result;
    },
  });

  return query;
};
