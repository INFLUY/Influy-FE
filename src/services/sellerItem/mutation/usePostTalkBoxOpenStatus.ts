import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTalkBoxOpenStatus } from '@/api/sellerItem/handleSellerItem.api';
import { TalkBoxOpenStatusType } from '@/types/common/ItemType.types';
import { QUERY_KEYS } from '@/constants/api';

export const usePostTalkBoxOpenStatus = ({
  itemId,
  openStatus,
  onSuccessCallback,
}: {
  itemId: number;
  openStatus: TalkBoxOpenStatusType;
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postTalkBoxOpenStatus({ itemId, openStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_ITEM_OVERVIEW, itemId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MARKET_ITEM, itemId],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
