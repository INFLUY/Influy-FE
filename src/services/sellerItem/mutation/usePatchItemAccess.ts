import { patchItemAccess } from '@/api/sellerItem/handleItemAccess';
import { QUERY_KEYS } from '@/constants/api';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ItemAccessDTO } from '@/types/common/ItemType.types';

export const usePatchItemAccess = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: ItemAccessDTO }) =>
      patchItemAccess({ itemId, data }),
    onSuccess: (_, _variable) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_ITEM_ACCESS, _variable.itemId],
      });

      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
