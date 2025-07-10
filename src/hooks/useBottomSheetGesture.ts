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

  // 터치 지원 여부 확인
  const isTouchSupported = 'ontouchstart' in window;

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

  // 좌표 추출 함수
  const getCoordinates = (e: any) => {
    if (e.type && e.type.startsWith('touch')) {
      return e.touches && e.touches[0] ? e.touches[0] : e.changedTouches[0];
    }
    return e;
  };

  useEffect(() => {
    if (disableGesture) return;
    if (!isBottomSheetOpen) return;
    if (!handleBarRef) return;
    const node = handleBarRef?.current;
    if (!node) return;

    const isDragging = { current: false };

    const handleStart = (e: any) => {
      const { touchStart } = metrics.current;

      const target = e.target as HTMLElement;
      const isScrollable = findScrollableParentElement(target);

      metrics.current.isContentAreaTouched = !!isScrollable;

      touchStart.sheetY = node.getBoundingClientRect().y;

      const coordinates = getCoordinates(e);
      touchStart.touchY = coordinates.clientY;

      isDragging.current = true;
      metrics.current.snap =
        touchStart.sheetY + (node.getBoundingClientRect().height / 4) * 1;
    };

    const handleMove = (e: any) => {
      const { touchStart, isContentAreaTouched } = metrics.current;

      if (!isDragging.current) return;

      const coordinates = getCoordinates(e);

      if (!isContentAreaTouched) {
        e.preventDefault();
        const touchOffset = coordinates.clientY - touchStart.touchY;
        node.style.setProperty(
          'transform',
          `translateY(${Math.max(touchOffset, 0)}px)`
        );
      }
    };

    const handleEnd = () => {
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

    // 터치 지원 여부에 따라 이벤트 리스너 추가
    if (isTouchSupported) {
      node.addEventListener('touchstart', handleStart, { passive: false });
      node.addEventListener('touchmove', handleMove, { passive: false });
      node.addEventListener('touchend', handleEnd);
    }

    node.addEventListener('mousedown', handleStart);
    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseup', handleEnd);

    return () => {
      if (isTouchSupported) {
        node.removeEventListener('touchstart', handleStart);
        node.removeEventListener('touchmove', handleMove);
        node.removeEventListener('touchend', handleEnd);
      }
      node.removeEventListener('mousedown', handleStart);
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseup', handleEnd);
    };
  }, [isBottomSheetOpen, disableGesture]);
};

export default useBottomSheetGesture;
