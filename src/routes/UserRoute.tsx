import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { LoginPage } from '@/pages';
import { BottomNavBar, LoadingSpinner } from '@/components';
import { Outlet, useLocation } from 'react-router-dom';

const UserRoute = () => {
  const { pathname } = useLocation();
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
  }, [memberId, pathname]);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!memberId) {
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
