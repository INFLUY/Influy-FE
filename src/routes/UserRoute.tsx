import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { LoginPage } from '@/pages';
import { BottomNavBar, LoadingSpinner } from '@/components';
import { Outlet } from 'react-router-dom';

const UserRoute = () => {
  const { memberId, reissue } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (memberId === null) {
        await reissue();
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [memberId]);

  if (loading) {
    return (
      <div className="flex flex-1 pb-16">
        <LoadingSpinner />
        <BottomNavBar />
      </div>
    );
  }

  if (!memberId) {
    // 로그인 후에 로그인 이전 페이지로 리다이렉트하기 위해 경로 저장
    sessionStorage.setItem('lastPath', location.pathname);

    return (
      <div className="flex flex-1 pb-16">
        <LoginPage />
        <BottomNavBar />
      </div>
    );
  }

  return <Outlet />;
};

export default UserRoute;
