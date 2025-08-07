import { getTalkBoxOpened } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetTalkBoxOpened = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_TALK_BOX_OPENED_ITEMS],
    queryFn: () => getTalkBoxOpened(),
    staleTime: 15 * 1000, // 15초
  });
};
