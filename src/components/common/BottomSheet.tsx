import useBottomSheetGesture from '@/hooks/useBottomSheetGesture';
import cn from '@/utils/cn';
import { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const root = document.getElementById('modal');
  if (!root) return;
  return ReactDOM.createPortal(children, root);
};

const BottomSheet = ({
  children,
  onClose,
  isBottomSheetOpen,
}: {
  children: ReactNode;
  onClose: () => void;
  isBottomSheetOpen: boolean;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBarRef = useRef<HTMLDivElement | null>(null);

  useBottomSheetGesture({ isBottomSheetOpen, handleBarRef, onClose });

  return (
    <ModalPortal>
      <div className="modal">
        <div className="modal-bg-layout" onClick={onClose}>
          <div
            className={cn(
              'flex h-fit flex-col items-center rounded-t-[12px] bg-white',
              { 'animate-slide-up': isBottomSheetOpen }
            )}
            onClick={(e) => e.stopPropagation()}
            ref={handleBarRef}
          >
            {/* 바텀 시트 헤더 */}
            <div className="flex w-full cursor-pointer justify-center rounded-t-[12px] pt-2 pb-4">
              <div className="bg-grey02 h-1 w-12 rounded-[2px]" />
            </div>
            {/* 바텀 시트 콘텐츠 */}
            <div className="flex h-fit w-full flex-col">{children}</div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default BottomSheet;
