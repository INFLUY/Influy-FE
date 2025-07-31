import { getSellerItems } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMarketItems = (sellerId: number) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_ITEMS, sellerId],
    queryFn: ({
      archive = false,
      sortType,
      onGoing = false,
      pageParam = 1,
      size = 10,
    }: {
      archive?: boolean;
      sortType?: 'END_DATE' | 'CREATE_DATE';
      onGoing?: boolean;
      pageParam: number;
      size?: number;
    }) =>
      getSellerItems({
        sellerId,
        archive,
        sortType,
        onGoing,
        page: pageParam,
        size,
      }),
    getNextPageParam: (lastPage, allPages) => {
      // lastPage: 마지막으로 불러온 페이지의 데이터
      // allPages: 지금까지 불러온 모든 페이지의 배열
      const currentPage = allPages?.length ?? 0;
      const totalPage = lastPage?.result?.totalPage ?? 0;

      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined; // hasNextPage: false
    },
    initialPageParam: 1,
  });

  return query;
};
