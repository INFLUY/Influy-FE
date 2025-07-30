import { getUserProfile } from '@/api/member/getUserProfile';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useQuery } from '@tanstack/react-query';

export const useGetUserProfile = () => {
  const { memberId } = useStrictId({ redirectOnFail: true });

  const query = useQuery({
    queryKey: [QUERY_KEYS.USER_MY_PROFILE],
    staleTime: 60 * 60 * 1000,
    gcTime: 70 * 60 * 1000,
    queryFn: async () => {
      const response = await getUserProfile({ memberId: memberId! });
      return response?.result;
    },
    enabled: memberId !== null,
  });

  return query;
};
