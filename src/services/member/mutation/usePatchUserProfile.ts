import { patchUserProfile } from '@/api/member/handleUserProfile';
import { QUERY_KEYS } from '@/constants/api';
import { UserEditProfileType } from '@/types/user/UserProfile.types';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchUserProfile = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: UserEditProfileType }) =>
      patchUserProfile({ data }),
    onSuccess: (response) => {
      const id = response.result?.id;
      if (id) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER_PROFILE, id], // 멤버 아이디 쿼리키에 추가. 본인 프로필 조회랑 다른 유저 프로필 조회 api랑 똑같음.
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER_PROFILE],
        });
      }
      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
