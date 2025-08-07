import { postLogout } from '@/api/auth/postLogout.api';
import { useAuthStore } from '@/store/authStore';
import { clearAuthQueries } from '@/utils/clearAuthQueries';
import { useHandleReactQueryError } from '@/hooks/useHandleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostLogout = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { clearAuthInfo } = useAuthStore();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      clearAuthInfo();
      clearAuthQueries(queryClient);
      onSuccessCallback?.();
    },
    onError: useHandleReactQueryError,
  });
};
