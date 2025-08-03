import { getSellerLikes } from '@/api/likes/handleSellerLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetSellerLike = ({ sellerId }: { sellerId?: number }) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_LIKES, sellerId],
    queryFn: () => getSellerLikes({ sellerId: sellerId! }),
    enabled: !!sellerId, // sellerId가 있어야 실행됨
  });
  return query;
};
