import { getSellerLikes } from '@/api/likes/handleSellerLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { LikeType } from '@/types/user/Like.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetSellerLike = ({
  sellerId,
}: {
  sellerId?: number;
}): UseQueryResult<LikeType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_LIKES, sellerId],
    queryFn: async () => {
      const response = await getSellerLikes({ sellerId: sellerId! });
      if (!response.result) throw new Error(response.message);
      return response.result;
    },
    enabled: !!sellerId, // sellerId가 있어야 실행됨
  });
};
