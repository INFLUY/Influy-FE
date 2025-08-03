import { getReissue } from '@/api/auth/getReissue.api';
import { create } from 'zustand';

interface AuthState {
  memberId: number | null;
  sellerId: number | null;
  accessToken: string | null;
  kakaoId: number | null;
  setAuthInfo: (auth: {
    accessToken: string;
    memberId: number;
    sellerId?: number | null;
  }) => void;
  clearAuthInfo: () => void;
  reissue: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  memberId: null,
  sellerId: null,
  accessToken: null,
  kakaoId: null,

  setAuthInfo: ({ accessToken, memberId, sellerId = null }) => {
    set({
      accessToken,
      memberId,
      sellerId,
    });
  },
  clearAuthInfo: () => {
    set({
      accessToken: null,
      memberId: null,
      sellerId: null,
    });
  },
  reissue: async () => {
    try {
      const data = await getReissue();

      if (!data.isSuccess || !data.result?.accessToken) {
        throw new Error('토큰 재발급 실패');
      }

      set({
        accessToken: data.result.accessToken,
        memberId: data.result.memberId,
        sellerId: data.result.sellerId ?? null,
      });

      return true;
    } catch (error) {
      console.error('토큰 재발급 실패', error);
      return false;
    }
  },
}));
