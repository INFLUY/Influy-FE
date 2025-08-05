import { getSellerItemDetail } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetMarketItemDetail = ({
  sellerId,
  itemId,
}: {
  sellerId?: number;
  itemId?: number;
}) => {
  const isValid = typeof sellerId === 'number' && typeof itemId === 'number';

  const query = useQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_ITEM, { sellerId, itemId }],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: isValid, // sellerId와 itemId가 모두 유효할 때만 실행
    queryFn: async () =>
      getSellerItemDetail({ sellerId: sellerId!, itemId: itemId! }),
  });

  return query;
};

export const useGetMarketItemDetailSuspense = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_ITEM, { sellerId, itemId }],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async () =>
      getSellerItemDetail({ sellerId: sellerId!, itemId: itemId! }),
  });

  return query;
};
