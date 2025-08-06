import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(PATH.HOME.BASE);
    }
  };
  return (
    <ArrowIcon
      className="h-6 w-6 shrink-0 cursor-pointer"
      onClick={handleBack}
    />
  );
};
