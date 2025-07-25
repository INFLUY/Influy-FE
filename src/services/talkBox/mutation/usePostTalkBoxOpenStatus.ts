import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTalkBoxOpenStatus } from '@/api/talkBox/handleSellerAnswer.api';
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
        queryKey: [QUERY_KEYS.SELLER_TALKBOX_OPEN_STATUS, itemId],
      });
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
