import ModalPortal from '@/components/common/ModalPortal';
import { useEffect } from 'react';

const SnackBar = ({
  children,
  time = 2000,
  handleSnackBarClose,
}: {
  children: React.ReactNode;
  time?: number;
  handleSnackBarClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSnackBarClose();
    }, time);
    return () => clearTimeout(timer);
  }, [time, handleSnackBarClose]);

  return (
    <ModalPortal>
      <div className="modal">
        <div
          className="modal-bg-layout bg-transparent"
          onClick={handleSnackBarClose}
        >
          <div
            className="bg-grey09 animate-fade-in-out absolute bottom-[6.5rem] flex items-center justify-center rounded-[.1875rem] px-4 py-[.625rem] text-white"
            style={{ animationDuration: `${time}ms` }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default SnackBar;
