import { getItemAccess } from '@/api/sellerItem/handleItemAccess';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetItemAccess = ({ itemId }: { itemId: number }) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_ITEM_ACCESS, itemId],
    queryFn: () => getItemAccess({ itemId }),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
