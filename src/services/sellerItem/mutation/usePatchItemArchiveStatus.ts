import { patchItemArchiveStatus } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchItemArchiveStatus = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();

  return useMutation({
    mutationFn: ({
      itemId,
      isArchived,
    }: {
      itemId: number;
      isArchived: boolean;
    }) => patchItemArchiveStatus(itemId, isArchived),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_MARKET], // 내 마켓 아이템 무효화
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_HOME_QUESTIONS], // 셀러 홈 질문 무효화
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
