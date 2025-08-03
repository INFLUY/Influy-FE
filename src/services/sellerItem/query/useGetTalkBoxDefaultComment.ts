import { getTalkBoxDefaultComment } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetTalkBoxDefaultComment = (itemId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_TALK_BOX_COMMENT, itemId],
    queryFn: () => getTalkBoxDefaultComment(itemId),
  });
};
