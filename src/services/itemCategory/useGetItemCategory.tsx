import { getItemCategory } from '@/api/itemCategory/getItemCategory';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetItemCategory = () => {
  return useQuery({
    queryFn: () => getItemCategory(),
    queryKey: [QUERY_KEYS.ITEM_CATEGORIES],
    staleTime: 60 * 60 * 1000,
    gcTime: 65 * 60 * 1000,
  });
};
