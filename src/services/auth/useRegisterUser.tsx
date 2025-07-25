import {
  postRegisterSeller,
  postRegisterUser,
} from '@/api/auth/handleRegisterUser.api';
import { useAuthStore } from '@/store/authStore';
import { SellerSignup, UserSignup } from '@/types/common/AuthTypes.types';
import { useMutation } from '@tanstack/react-query';

export const useRegisterUser = (onSuccessCallback?: () => void) => {
  const { setAuthInfo } = useAuthStore();

  return useMutation({
    mutationFn: (data: UserSignup) => postRegisterUser({ data }),
    onSuccess: (data) => {
      setAuthInfo({
        accessToken: data.result.accessToken,
        memberId: data.result.memberId,
        sellerId: null,
      });
      onSuccessCallback?.();
    },
    onError: () => {
      // TODO
    },
  });
};

export const useRegisterSeller = (onSuccessCallback?: () => void) => {
  const { setAuthInfo } = useAuthStore();

  return useMutation({
    mutationFn: (data: SellerSignup) => postRegisterSeller({ data }),
    onSuccess: (data) => {
      setAuthInfo({
        accessToken: data.result.accessToken,
        memberId: data.result.memberId,
        sellerId: data.result?.sellerId,
      });
      onSuccessCallback?.();
    },
    onError: () => {
      // TODO
    },
  });
};
