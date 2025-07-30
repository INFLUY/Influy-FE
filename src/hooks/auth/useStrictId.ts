import { useAuthStore } from '@/store/authStore';
import { useEffect, useRef, useState } from 'react';

/** 토큰 재발급 로직 건너뛰고 싶으면 skip = true */
export const useStrictId = ({ skip = false } = {}) => {
  const { memberId, sellerId, reissue } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authState, setAuthState] = useState<{
    needsLogin: boolean;
    memberId: number | null;
    sellerId: number | null;
  }>({
    needsLogin: false,
    memberId: memberId,
    sellerId: sellerId,
  });
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    if (skip) return;
    const checkAuth = async () => {
      // 토큰 갱신 중이면 대기
      if (isRefreshingRef.current) return;

      // 셀러
      if (memberId !== null && sellerId !== null) {
        setAuthState({ needsLogin: false, memberId, sellerId });
        setIsLoading(false);
        return;
      }

      // 일반 유저
      if (memberId !== null && sellerId === null) {
        setAuthState({ needsLogin: false, memberId, sellerId: null });
        setIsLoading(false);
        return;
      }

      isRefreshingRef.current = true;

      try {
        const success = await reissue();

        if (!success) {
          setAuthState({ needsLogin: true, memberId: null, sellerId: null });
        } else {
          const { memberId, sellerId } = useAuthStore.getState();
          setAuthState({ needsLogin: false, memberId, sellerId });
        }
      } catch (e) {
        console.error('토큰 재발급 실패', e);
        setAuthState({ needsLogin: true, memberId, sellerId: null });
      } finally {
        setIsLoading(false);
        isRefreshingRef.current = false;
      }
    };

    checkAuth();
  }, [skip]);

  return { isLoading, ...authState };
};
