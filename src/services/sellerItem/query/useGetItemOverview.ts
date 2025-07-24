import { fetchItemOverview } from '@/api/sellerItem/handleSellerItem.api';
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
  const { itemOverview } = useItemOverviewStore();

  return useQuery({
    queryKey: [QUERY_KEYS.SELLER_ITEM_OVERVIEW, sellerId, itemId],
    queryFn: () => fetchItemOverview({ sellerId, itemId }),
    enabled: !(itemOverview && itemOverview.id === itemId),
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

  const { data: itemOverviewData } = useGetItemOverview({
    sellerId,
    itemId,
  });

  useEffect(() => {
    if (itemOverviewData) setItemOverview(itemOverviewData);
  }, [itemOverviewData, setItemOverview]);

  return { itemOverview };
};
