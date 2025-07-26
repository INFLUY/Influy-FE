import { getReissue } from '@/api/auth/getReissue.api';
import {
  SellerSignupState,
  SnsLinkProps,
  UserSignupState,
} from '@/types/common/AuthTypes.types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
  setKakaoId: (kakaoId: number) => void;
  logout: () => void;
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
  setKakaoId: (kakaoId: number) => {
    set({ kakaoId });
  },
  logout: () => {
    set({
      accessToken: null,
      memberId: null,
      sellerId: null,
    });
  },
  clearAuthInfo: () => {
    set({
      accessToken: null,
      memberId: null,
      sellerId: null,
      kakaoId: null,
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

interface UserSignupStoreState extends UserSignupState {
  setId: (id: string) => void;
  setInterestedCategories: (categories: number[]) => void;
  reset: () => void;
}

const initialUserSignupState: UserSignupState = {
  id: '',
  email: '',
  interestedCategories: [],
};

export const useUserSignupStore = create<UserSignupStoreState>()(
  persist(
    (set) => ({
      ...initialUserSignupState,
      setId: (id: string) => set({ id }),
      setInterestedCategories: (interestedCategories: number[]) =>
        set({ interestedCategories }),
      reset: () => set({ ...initialUserSignupState }),
    }),
    {
      name: 'user-signup-storage', // 저장소 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

interface SellerSignupStoreState extends SellerSignupState {
  setId: (id: string) => void;
  setEmail: (email: string) => void;
  setSns: (sns: Partial<SnsLinkProps>) => void;
  setInterestedCategories: (categories: number[]) => void;
  reset: () => void;
}

const initialSellerSignupState: SellerSignupState = {
  id: '',
  email: '',
  sns: {
    instagram: '',
    youtube: '',
    tiktok: '',
  },
  interestedCategories: [],
};

export const useSellerSignupStore = create<SellerSignupStoreState>()(
  persist(
    (set) => ({
      id: '',
      sns: {
        instagram: '',
        youtube: '',
        tiktok: '',
      },
      email: '',
      interestedCategories: [],
      setId: (id: string) => set({ id }),
      setSns: (sns: Partial<SnsLinkProps>) =>
        set((state) => ({
          sns: {
            ...state.sns,
            ...sns,
          },
        })),
      setEmail: (email: string) => set({ email }),
      setInterestedCategories: (interestedCategories: number[]) =>
        set({ interestedCategories }),
      reset: () => set({ ...initialSellerSignupState }),
    }),
    {
      name: 'seller-signup-storage', // 저장소 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
