import { getMarket, getMyMarket } from '@/api/sellerMyProfile/getMarket.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetMyMarket = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.SELLER_MY_MARKET],
    staleTime: 30 * 60 * 1000,
    gcTime: 40 * 60 * 1000,
    queryFn: () => getMyMarket(),
  });

  return query;
};

export const useGetMarket = ({ sellerId }: { sellerId: number }) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET, sellerId],
    // staleTime: 30 * 60 * 1000,
    // gcTime: 40 * 60 * 1000,
    queryFn: () => getMarket({ sellerId }),
  });

  return query;
};
