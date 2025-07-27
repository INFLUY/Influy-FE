import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  SellerSignupState,
  SnsLinkProps,
  UserSignupState,
} from '@/types/common/AuthTypes.types';

interface KakaoState {
  kakaoId: number | null;
  setKakaoId: (kakaoId: number) => void;
  clearKakaoId: () => void;
}

export const useKakaoStore = create<KakaoState>()(
  persist(
    (set) => ({
      kakaoId: null,
      setKakaoId: (kakaoId) => set({ kakaoId }),
      clearKakaoId: () => set({ kakaoId: null }),
    }),
    {
      name: 'kakao-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

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
