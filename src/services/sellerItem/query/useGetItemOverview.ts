import { getItemOverview } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useItemOverviewStore } from '@/store/item/itemOverviewStore';

export const useGetItemOverview = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SELLER_ITEM_OVERVIEW, itemId],
    queryFn: () => getItemOverview({ sellerId, itemId }),
    staleTime: Infinity,
  });
};

export const useItemOverview = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const { itemOverview, setItemOverview } = useItemOverviewStore();

  const { data: itemOverviewData, isFetching } = useGetItemOverview({
    sellerId,
    itemId,
  });

  useEffect(() => {
    if (itemOverviewData) setItemOverview(itemOverviewData);
  }, [itemOverviewData, setItemOverview]);

  return { itemOverview, isFetching };
};
