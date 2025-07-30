import { useNavigate } from 'react-router-dom';
import InfluyLogo from '@/assets/icon/common/InfluyIcon.svg?react';
import { PATH } from '@/routes/path';
import { useEffect } from 'react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(PATH.HOME.BASE);
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
