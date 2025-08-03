import {
  postRegisterSeller,
  postRegisterUser,
} from '@/api/auth/handleRegisterUser.api';
import { PATH } from '@/routes/path';
import { useAuthStore } from '@/store/authStore';
import { SellerSignup, UserSignup } from '@/types/common/AuthTypes.types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useRegisterUser = (onSuccessCallback?: () => void) => {
  const { setAuthInfo } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UserSignup) => postRegisterUser({ data }),
    onSuccess: (data) => {
      setAuthInfo({
        accessToken: data.accessToken,
        memberId: data.memberId,
        sellerId: null,
      });

      navigate(PATH.WELCOME.BASE);
      onSuccessCallback?.();
    },
    onError: () => {
      // TODO
    },
  });
};

export const useRegisterSeller = (onSuccessCallback?: () => void) => {
  const { setAuthInfo } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SellerSignup) => postRegisterSeller({ data }),
    onSuccess: (data) => {
      setAuthInfo({
        accessToken: data.accessToken,
        memberId: data.memberId,
        sellerId: data?.sellerId,
      });

      navigate(PATH.WELCOME.BASE);
      onSuccessCallback?.();
    },
    onError: () => {
      // TODO
    },
  });
};
