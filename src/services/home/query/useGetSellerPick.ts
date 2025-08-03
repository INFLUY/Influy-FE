import { getSellerPick } from '@/api/home/getSellerPick';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetSellerPick = (sellerId: number | null) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.HOME_SELLER_PICK, sellerId],
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    queryFn: () => {
      if (sellerId === null) {
        throw new Error('인플루언서 아이디가 존재하지 않습니다.');
      }
      return getSellerPick({ sellerId });
    },
    enabled: !!sellerId,
  });

  return query;
};
