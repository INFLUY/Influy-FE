import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { PATH } from './path';

export const SellerAuthInterceptor = () => {
  const { sellerId } = useAuthStore();

  if (!sellerId) {
    return <Navigate to={PATH.LOGIN.base} replace />;
  }

  return <Outlet />;
};
