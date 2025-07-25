import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from './path';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { UIError } from '@/libs/error/UIError';
import { LoadingSpinner } from '@/components';

const SellerRoute = () => {
  const { isLoading, needsLogin, sellerId } = useStrictId();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // 로그인 필요
  if (needsLogin) {
    return <Navigate to={PATH.LOGIN.BASE} replace />;
  }

  // 셀러가 아님
  if (sellerId === null) {
    throw new UIError(
      '인플루언서가 아닙니다.\n인플루언서로 로그인해주세요.',
      '홈으로',
      () => window.location.replace(PATH.HOME.BASE)
    );
  }

  return <Outlet />;
};

export default SellerRoute;
