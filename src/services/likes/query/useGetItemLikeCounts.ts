import { getItemLikeCounts } from '@/api/likes/handleItemLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetItemLikeCounts = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ITEM_LIKE_COUNTS, itemId],
    queryFn: () => getItemLikeCounts({ sellerId, itemId }),
    staleTime: 3 * 60 * 1000, // 3분
  });
};
