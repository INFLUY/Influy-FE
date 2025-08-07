import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useNavigate } from 'react-router-dom';

const CloseComponent = () => {
  const navigate = useNavigate();
  const lastPath = sessionStorage.getItem('lastPath');

  const handleClose = () => {
    sessionStorage.removeItem('lastPath');
    navigate(lastPath!);
  };

  if (lastPath) {
    return (
      <XIcon
        aria-label="창 닫기"
        role="button"
        className="h-6 w-6 cursor-pointer text-white"
        onClick={handleClose}
      />
    );
  } else return null;
};

export default CloseComponent;
