import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from './path';

const RegisterRoute = () => {
  const { kakaoId } = useAuthStore();

  if (!kakaoId) {
    return <Navigate to={PATH.LOGIN.BASE} replace />;
  }

  return <Outlet />;
};

export default RegisterRoute;
