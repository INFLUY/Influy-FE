import { postItemLike } from '@/api/likes/handleItemLikes.api';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation } from '@tanstack/react-query';

export const usePostItemLike = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: ({ sellerId, itemId }: { sellerId: number; itemId: number }) =>
      postItemLike({ sellerId, itemId }),
    onSuccess: () => {
      // TODO: 캐시 갱신
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
