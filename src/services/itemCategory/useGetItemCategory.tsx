import { getItemCategory } from '@/api/itemCategory/getItemCategory';
import { QUERY_KEYS } from '@/constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetItemCategory = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getItemCategory(),
    queryKey: [QUERY_KEYS.ITEM_CATEGORIES],
  });

  return data?.result;
};
