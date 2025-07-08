import { RefObject, useEffect, useRef } from 'react';

type BottomSheetMetrics = {
  touchStart: {
    sheetY: number; // 바텀 시트 초기 위치
    touchY: number; // 사용자가 터치한 위치
  };
  snap: number; // 바텀 시트가 닫히는 기준 위치
  isContentAreaTouched: boolean;
};

type useBottomSheetGestureProps = {
  isBottomSheetOpen: boolean;
  handleBarRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  disableGesture?: boolean;
};

const useBottomSheetGesture = ({
  isBottomSheetOpen,
  handleBarRef,
  onClose,
  disableGesture = false,
}: useBottomSheetGestureProps) => {
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
    if (disableGesture) return;
    if (!isBottomSheetOpen) return;
    if (!handleBarRef) return;
    const node = handleBarRef?.current;
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
  }, [isBottomSheetOpen, disableGesture]);
};

export default useBottomSheetGesture;
