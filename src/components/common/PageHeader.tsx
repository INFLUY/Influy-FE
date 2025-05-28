import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <header className="text-grey10 subhead-sb border-grey03 sticky w-full items-center justify-center border-b px-5 py-[.875rem] text-center">
      <ArrowIcon
        className="absolute top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-black"
        onClick={() => navigate(-1)}
      />
      {children}
    </header>
  );
};

export default PageHeader;
