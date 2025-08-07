import { putSellerMyItemSortType } from '@/api/sellerMyProfile/putSellerMyItemSortType.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { ItemSortType } from '@/types/common/ItemType.types';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePutSellerItemSortType = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({ sortType }: { sortType: ItemSortType }) =>
      putSellerMyItemSortType({ sortType }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_MARKET], // 내 마켓 무효화
      });
      // 일반 유저 시점으로 보는 내 마켓 아이템 무효화
      // sellerId만 일치하면 archive/onGoing 있어도 무효화
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === QUERY_KEYS.SELLER_MARKET_ITEMS &&
          (query.queryKey[1] as any)?.sellerId === sellerId,
      });
      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
