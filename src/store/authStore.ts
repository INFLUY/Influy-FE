import {
  SellerSignupState,
  SnsLinkProps,
  UserSignupState,
} from '@/types/common/AuthTypes.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  memberId: number | null;
  sellerId: number | null;
  accessToken: string | null;
  kakaoId: number | null;
  setAuthInfo: (auth: {
    accessToken: string;
    memberId: number;
    sellerId: number | null;
  }) => void;
  setKakaoId: (kakaoId: number) => void;
  logout: () => void;
  clearAuthInfo: () => void;
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
      kakaoId: null,
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
}));

interface UserSignupStoreState extends UserSignupState {
  setId: (id: string) => void;
  setInterestedCategories: (categories: number[]) => void;
  reset: () => void;
}

const initialUserSignupState: UserSignupState = {
  id: '',
  email: '',
  intersetedCategories: [],
};

export const useUserSignupStore = create<UserSignupStoreState>()(
  persist(
    (set) => ({
      ...initialUserSignupState,
      setId: (id: string) => set({ id }),
      setInterestedCategories: (intersetedCategories: number[]) =>
        set({ intersetedCategories }),
      reset: () => set({ ...initialUserSignupState }),
    }),
    {
      name: 'user-signup-storage', // 저장소 이름
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
  intersetedCategories: [],
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
      intersetedCategories: [],
      setId: (id: string) => set({ id }),
      setSns: (sns: Partial<SnsLinkProps>) =>
        set((state) => ({
          sns: {
            ...state.sns,
            ...sns,
          },
        })),
      setEmail: (email: string) => set({ email }),
      setInterestedCategories: (intersetedCategories: number[]) =>
        set({ intersetedCategories }),
      reset: () => set({ ...initialSellerSignupState }),
    }),
    {
      name: 'seller-signup-storage', // 저장소 이름
    }
  )
);
