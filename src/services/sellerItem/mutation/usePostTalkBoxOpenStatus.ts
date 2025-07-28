import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTalkBoxOpenStatus } from '@/api/sellerItem/handleSellerItem.api';
import { TalkBoxOpenStatus } from '@/types/common/ItemType.types';
import { QUERY_KEYS } from '@/constants/api';

export const usePostTalkBoxOpenStatus = ({
  itemId,
  openStatus,
}: {
  itemId: number;
  openStatus: TalkBoxOpenStatus;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postTalkBoxOpenStatus({ itemId, openStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_ITEM_OVERVIEW, itemId],
      });
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
