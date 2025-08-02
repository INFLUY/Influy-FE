import { ReactNode, Suspense } from 'react';
import ModalPortal from '@/components/common/ModalPortal';
import cn from '@/utils/cn';
import XIcon from '@/assets/icon/common/XIcon.svg?react';

const TalkBoxBottomSheetLayout = ({
  children,
  onClose,
  isBottomSheetOpen,
  title,
}: {
  children: ReactNode;
  onClose: () => void;
  isBottomSheetOpen: boolean;
  title: string;
}) => {
  return (
    <ModalPortal>
      <div className="modal">
        <div
          className="flex h-screen w-screen max-w-[40rem] min-w-[20rem] flex-1 flex-col justify-end overflow-x-clip md:w-[28rem]"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <div
            className={cn(
              'flex h-[85%] flex-col items-center rounded-t-[1.5rem] bg-white shadow-[0rem_.25rem_4.325rem_0rem_rgba(0,0,0,0.35)]',
              { 'animate-slide-up': isBottomSheetOpen }
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 바텀 시트 헤더 */}
            <div className="border-grey02 relative box-border flex w-full cursor-pointer items-center justify-center border-b px-5 py-[.9375rem]">
              <XIcon
                className="absolute left-5 h-6 w-6 cursor-pointer"
                onClick={onClose}
              />
              <Suspense fallback={null}>
                <span className="subhead-sb text-grey10">{title}</span>
              </Suspense>
            </div>
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default TalkBoxBottomSheetLayout;
