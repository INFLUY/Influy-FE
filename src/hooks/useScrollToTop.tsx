import { useEffect, useRef } from 'react';
// 사용 방법:   const scrollViewRef = useScrollToTop();

export const useScrollToTop = (
  behavior: ScrollBehavior = 'instant',
  block: ScrollLogicalPosition = 'center'
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior, block });
  }, []);

  return ref;
};
