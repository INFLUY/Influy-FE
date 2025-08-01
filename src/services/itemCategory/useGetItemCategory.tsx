import { getItemCategory } from '@/api/itemCategory/getItemCategory';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetItemCategory = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getItemCategory(),
    queryKey: [QUERY_KEYS.ITEM_CATEGORIES],
    staleTime: 60 * 60 * 1000,
    gcTime: 65 * 60 * 1000,
  });

  return data?.result;
};
