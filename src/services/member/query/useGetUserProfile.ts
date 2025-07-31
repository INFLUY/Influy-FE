import { getUserProfile } from '@/api/member/handleUserProfile';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUserProfile = ({ memberId }: { memberId: number }) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE, memberId],
    staleTime: 60 * 60 * 1000,
    gcTime: 70 * 60 * 1000,
    queryFn: async () => {
      const response = await getUserProfile({ memberId });
      return response?.result;
    },
    enabled: memberId !== null,
  });

  return query;
};
