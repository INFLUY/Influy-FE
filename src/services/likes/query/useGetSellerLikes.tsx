import { getSellerLikes } from '@/api/likes/handleSellerLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { LikeType } from '@/types/common/Like.types';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export const useGetSellerLike = ({
  sellerId,
}: {
  sellerId: number;
}): UseSuspenseQueryResult<LikeType, Error> => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_LIKES, sellerId],
    queryFn: async () => {
      const response = await getSellerLikes({ sellerId });
      return response.result;
    },
  });
};
