import { deleteAccount } from '@/api/auth/deleteAccount.api';
import { useAuthStore } from '@/store/authStore';
import { clearAuthQueries } from '@/utils/clearAuthQueries';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAccount = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { clearAuthInfo } = useAuthStore();

  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      clearAuthInfo();
      clearAuthQueries(queryClient);
      onSuccessCallback?.();
    },
    onError: handleReactQueryError,
  });
};
