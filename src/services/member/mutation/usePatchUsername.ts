import { patchUsername } from '@/api/member/patchUsername';
import { QUERY_KEYS } from '@/constants/api';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchUsername = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: { username: string } }) =>
      patchUsername({ data }),
    onSuccess: (response) => {
      const id = response?.id;
      if (id) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER_PROFILE, id], // 멤버 아이디 쿼리키에 추가. 본인 프로필 조회랑 다른 유저 프로필 조회 api랑 똑같음.
        });
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_PROFILE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_PROFILE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_MARKET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MY_MARKET],
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === QUERY_KEYS.ID_DUPLICATE_CHECK,
      });
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
