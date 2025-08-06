import { PATH } from '@/routes/path';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useRef, useState } from 'react';

// 유저나 셀러가 아니어도 괜찮은 경우, 즉 튕길 필요 없는 경우 사용!!

/** 토큰 재발급 로직 건너뛰고 싶으면 skip = true */
export const useStrictId = ({ skip = false, redirectOnFail = false } = {}) => {
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
          if (redirectOnFail) {
            sessionStorage.setItem('lastPath', window.location.pathname);
            window.location.replace(PATH.LOGIN.BASE);
          }
        } else {
          const { memberId, sellerId } = useAuthStore.getState();
          setAuthState({ needsLogin: false, memberId, sellerId });
        }
      } catch (e) {
        console.error('토큰 재발급 실패', e);
        setAuthState({ needsLogin: true, memberId, sellerId: null });
        if (redirectOnFail) {
          sessionStorage.setItem('lastPath', window.location.pathname);
          window.location.replace(PATH.LOGIN.BASE);
        }
      } finally {
        setIsLoading(false);
        isRefreshingRef.current = false;
      }
    };

    checkAuth();
  }, [skip]);

  return { isLoading, ...authState };
};
