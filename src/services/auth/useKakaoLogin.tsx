import { handleKakaoLogin } from '@/api/auth/handleKakaoLogin.api';
import { PATH } from '@/routes/path';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { setAuthInfo, setKakaoId } = useAuthStore();
  return useMutation({
    mutationFn: (code: string) => handleKakaoLogin(code),
    onSuccess: (data) => {
      if (data.result?.kakaoId) {
        setKakaoId(data.result?.kakaoId);
        navigate(PATH.REGISTER.base, { replace: true });
      } else {
        setAuthInfo({
          accessToken: data.result.accessToken,
          memberId: data.result.memberId,
          sellerId: data.result?.sellerId,
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
