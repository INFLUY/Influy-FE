import { useNavigate } from 'react-router-dom';
import InfluyLogo from '@/assets/icon/common/InfluyLogo.svg?react';
import { PATH } from '@/routes/path';
import { useEffect } from 'react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // 로그인 여부 확인 필요
      navigate(PATH.LOGIN.base);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <article className="flex flex-1 items-center justify-center bg-[#000]">
      <InfluyLogo className="h-[2.75rem] text-white" />
    </article>
  );
};

export default SplashScreen;
