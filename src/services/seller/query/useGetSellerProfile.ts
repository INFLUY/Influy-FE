import { getSellerMyProfile } from '@/api/sellerMyProfile/handleSellerMyProfile.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useQuery } from '@tanstack/react-query';

export const useGetSellerProfile = () => {
  const { sellerId, isLoading } = useStrictId();
  const query = useQuery({
    queryKey: [QUERY_KEYS.SELLER_MY_PROFILE],
    staleTime: 60 * 60 * 1000,
    gcTime: 70 * 60 * 1000,
    queryFn: async () => getSellerMyProfile(),
    enabled: sellerId !== null && !isLoading,
  });

  return query;
};
