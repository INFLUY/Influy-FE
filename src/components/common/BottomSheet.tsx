import cn from '@/utils/cn';
import { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const root = document.getElementById('modal');
  if (!root) return;
  return ReactDOM.createPortal(children, root);
};

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // 바텀 시트 초기 위치
    touchY: number; // 사용자가 터치한 위치
  };
  snap: number; // 바텀 시트가 닫히는 기준 위치
  isContentAreaTouched: boolean;
}

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

  const handleBarRef = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    snap: 0,
    isContentAreaTouched: false,
  });

  // 스크롤 가능한 부모 요소를 찾음
  const findScrollableParentElement = (
    element: HTMLElement | null
  ): HTMLElement | null => {
    while (element) {
      const overflowY = getComputedStyle(element).overflowY;
      const isScrollable = element.scrollHeight > element.clientHeight;
      if (isScrollable && overflowY !== 'hidden') {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  };

  useEffect(() => {
    if (!isBottomSheetOpen) return;
    const node = handleBarRef.current;
    if (!node) return;

    const isDragging = { current: false };

    const handleTouchStart = (e: TouchEvent | MouseEvent) => {
      const { touchStart } = metrics.current;

      const target = e.target as HTMLElement;
      const isScrollable = findScrollableParentElement(target);

      metrics.current.isContentAreaTouched = !!isScrollable; // boolean으로 명시적 반환(요소가 있으면 true)

      touchStart.sheetY = node.getBoundingClientRect().y;
      if (e instanceof TouchEvent) {
        touchStart.touchY = e.touches[0].clientY;
      } else {
        touchStart.touchY = e.clientY;
      }

      isDragging.current = true;
      metrics.current.snap =
        touchStart.sheetY + (node.getBoundingClientRect().height / 4) * 1;
    };

    const handleTouchMove = (e: TouchEvent | MouseEvent) => {
      const { touchStart, isContentAreaTouched } = metrics.current;

      if (!isDragging.current) return;
      let currentTouch;
      if (e instanceof TouchEvent) {
        currentTouch = e.touches[0];
      } else {
        currentTouch = e;
      }
      if (!isContentAreaTouched) {
        e.preventDefault();
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        node.style.setProperty(
          'transform',
          `translateY(${Math.max(touchOffset, 0)}px)`
        );
      }
    };

    // 손가락을 뗐을 때의 높이에 따라 닫을지 말지 결정
    const handleTouchEnd = () => {
      const { touchStart, snap } = metrics.current;
      const currentY = node.getBoundingClientRect().y;

      if (currentY > snap) {
        node.style.setProperty(
          'transform',
          `translateY(${window.innerHeight - touchStart.sheetY}px)`
        );
        onClose();
      } else if (currentY < snap) {
        node.style.setProperty('transform', 'translateY(0px)');
      }

      isDragging.current = false;
      metrics.current.isContentAreaTouched = false;
    };

    node.addEventListener('touchstart', handleTouchStart);
    node.addEventListener('touchmove', handleTouchMove);
    node.addEventListener('touchend', handleTouchEnd);
    node.addEventListener('mousedown', handleTouchStart);
    node.addEventListener('mousemove', handleTouchMove);
    node.addEventListener('mouseup', handleTouchEnd);

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('touchend', handleTouchEnd);
      node.removeEventListener('mousedown', handleTouchStart);
      node.removeEventListener('mousemove', handleTouchMove);
      node.removeEventListener('mouseup', handleTouchEnd);
    };
  }, [isBottomSheetOpen]);

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
            <div className="flex w-full justify-center rounded-t-[12px] pt-2 pb-4">
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
