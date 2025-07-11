import ModalPortal from '@/components/common/ModalPortal';
import cn from '@/utils/cn';
import { useEffect } from 'react';

const SnackBar = ({
  children,
  time = 2000,
  handleSnackBarClose,
  additionalStyles,
}: {
  children: React.ReactNode;
  time?: number;
  handleSnackBarClose: () => void;
  additionalStyles?: string;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {}, time);
    return () => clearTimeout(timer);
  }, [time, handleSnackBarClose]);

  return (
    <ModalPortal>
      <div className="modal pointer-events-none">
        <div className="modal-bg-layout bg-transparent">
          <div
            className={cn(
              'bg-grey09 animate-fade-in-out absolute bottom-[6.5rem] z-30 mx-5 flex max-w-[15.75rem] items-center justify-center rounded-[.1875rem] px-4 py-[.625rem] text-center text-white',
              additionalStyles
            )}
            style={{ animationDuration: `${time}ms` }}
            onAnimationEnd={() => handleSnackBarClose()}
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
