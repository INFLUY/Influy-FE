import { handleKakaoLogin } from '@/api/auth/handleKakaoLogin.api';
import { PATH } from '@/routes/path';
import { useAuthStore } from '@/store/authStore';
import {
  LoginedUserAuthResponse,
  LoginedUserResult,
  RegisterAuthResponse,
  RegisterResult,
} from '@/types/common/AuthTypes.types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function isRegisterResult(
  result: RegisterResult | LoginedUserResult
): result is RegisterResult {
  return (result as RegisterResult).kakaoId !== undefined;
}

export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { setAuthInfo, setKakaoId } = useAuthStore();
  const redirectToLocal = import.meta.env.MODE === 'development';

  return useMutation({
    mutationFn: (code: string) => handleKakaoLogin(code, redirectToLocal),
    onSuccess: (response: RegisterAuthResponse | LoginedUserAuthResponse) => {
      if (isRegisterResult(response.result)) {
        setKakaoId(response.result.kakaoId);
        navigate(PATH.REGISTER.base, { replace: true });
      } else {
        setAuthInfo({
          accessToken: response.result.accessToken,
          memberId: response.result.memberId,
          sellerId: response.result?.sellerId,
        });
        navigate(PATH.HOME.base, { replace: true });
      }
    },
    onError: () => {
      // TODO
      navigate(PATH.LOGIN.base, { replace: true });
    },
  });
};
