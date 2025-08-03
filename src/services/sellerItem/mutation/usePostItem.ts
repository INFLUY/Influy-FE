import { postItem } from '@/api/sellerItem/handleSellerItem.api';
import { QUERY_KEYS } from '@/constants/api';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { ItemPostDetail } from '@/types/common/ItemType.types';
import { SELLER_ITEM_DETAIL } from '@/utils/generatePath';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generatePath, useNavigate } from 'react-router-dom';

export const usePostItem = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { sellerId } = useStrictId();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ItemPostDetail) => postItem(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_MARKET], // 내 마켓 아이템 무효화
      });
      // 일반 유저 시점으로 보는 내 마켓 아이템 무효화
      // sellerId만 일치하면 archive/onGoing 있어도 무효화
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === QUERY_KEYS.SELLER_MARKET_ITEMS &&
          (query.queryKey[1] as any)?.sellerId === sellerId,
      });

      if (res?.itemId) {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.SELLER_MARKET_ITEM,
            { sellerId, itemId: res.itemId },
          ],
        });
        navigate(generatePath(SELLER_ITEM_DETAIL, { itemId: res.itemId }), {
          replace: true,
        });
      }
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
