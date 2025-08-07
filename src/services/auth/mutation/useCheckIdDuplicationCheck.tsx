import { postIdDuplicateCheck } from '@/api/auth/postIdDuplicateCheck.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';

export const useCheckIdDuplicate = (username: string, enabled: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ID_DUPLICATE_CHECK, username],
    queryFn: () => postIdDuplicateCheck({ username }),
    staleTime: 1 * 60 * 1000,
    enabled,
  });
};
