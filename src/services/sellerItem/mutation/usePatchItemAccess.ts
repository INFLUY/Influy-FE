import { patchItemAccess } from '@/api/sellerItem/patchItemAccess';
// import { QUERY_KEYS } from '@/constants/api';
// import { useStrictId } from '@/hooks/auth/useStrictId';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation } from '@tanstack/react-query';
import { ItemAccessRequestType } from '@/types/common/ItemType.types';

export const usePatchItemAccess = (onSuccessCallback?: () => void) => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: number;
      data: ItemAccessRequestType;
    }) => patchItemAccess({ itemId, data }),
    onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: [QUERY_KEYS.SELLER_MY_MARKET], // 내 마켓 아이템 무효화
      //   });

      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
