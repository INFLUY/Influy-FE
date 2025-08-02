import { getSellerItems } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { ItemSortType } from '@/types/common/ItemType.types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMarketItems = ({
  sellerId,
  archive = false,
  sortType = 'END_DATE',
  onGoing = false,
  size = 10,
}: {
  sellerId: number;
  archive?: boolean;
  sortType?: ItemSortType;
  onGoing?: boolean;
  size?: number;
}) => {
  const query = useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.SELLER_MARKET_ITEMS,
      { sellerId, archive, sortType, onGoing },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getSellerItems({
        sellerId,
        archive,
        sortType,
        onGoing,
        page: pageParam,
        size,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages?.length ?? 0;
      const totalPage = lastPage?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  return query;
};
