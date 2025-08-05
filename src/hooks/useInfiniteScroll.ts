import { useEffect } from 'react';

interface UseInfiniteScrollProps {
  targetRef: React.RefObject<HTMLElement | null>;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  threshold?: number;
  enabled?: boolean;
}

const useInfiniteScroll = ({
  targetRef,
  fetchNextPage,
  hasNextPage = true,
  isFetchingNextPage = false,
  threshold = 0.1,
  enabled = true,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    if (!targetRef.current || !hasNextPage || isFetchingNextPage || !enabled)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: threshold }
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);
};

export default useInfiniteScroll;
