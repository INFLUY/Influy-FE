import {
  postRegisterSeller,
  postRegisterUser,
} from '@/api/auth/handleRegisterUser.api';
import { SellerSignup, UserSignup } from '@/types/common/AuthTypes.types';
import { useMutation } from '@tanstack/react-query';

export const useRegisterUser = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (data: UserSignup) => postRegisterUser({ data }),
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      // TODO
    },
  });
};

export const useRegisterSeller = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (data: SellerSignup) => postRegisterSeller({ data }),
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      // TODO
    },
  });
};
