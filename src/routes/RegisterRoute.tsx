import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from './path';

const RegisterRoute = () => {
  const { accessToken, memberId, kakaoId } = useAuthStore();

  if (accessToken && memberId) {
    return <Navigate to={PATH.HOME.base} replace />;
  } else if (!kakaoId) {
    return <Navigate to={PATH.LOGIN.base} replace />;
  }

  return <Outlet />;
};

export default RegisterRoute;
