import { getMarketLinks } from '@/api/marketLink/handleMarketLink.api';
import { QUERY_KEYS } from '@/constants/api';
import { useSnackbarStore } from '@/store/snackbarStore';
import { LinkType } from '@/types/seller/LinkType.types';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export const useGetMarketLinks = ({
  sellerId,
}: {
  sellerId: number;
}): UseSuspenseQueryResult<LinkType[] | [], Error> => {
  const { showSnackbar } = useSnackbarStore();
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_MARKET_LINKS, sellerId],
    queryFn: async () => {
      const res = await getMarketLinks({ sellerId });
      const { code, message, result } = res;

      if (code !== 'COMMON200') {
        showSnackbar(
          message ?? '마켓 링크를 불러오는 데 실패했습니다.',
          'error'
        );
      }

      return result;
    },
  });
};
