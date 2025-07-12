import {
  SellerSignupState,
  SnsLinkProps,
  UserSignupState,
} from '@/types/common/AuthTypes.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  sellerId: number | null;
  setSellerId: (id: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  sellerId: 1, // 로그인 구현 전 개발을 위한 Default value
  setSellerId: (id) => set({ sellerId: id }),
  logout: () => set({ sellerId: null }),
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
      setId: (id: string) => set({ id }),
      setSns: (sns: Partial<SnsLinkProps>) =>
        set((state) => ({
          sns: {
            ...state.sns,
            ...sns,
          },
        })),
      setEmail: (email: string) => set({ email }),
      reset: () => set({ ...initialSellerSignupState }),
    }),
    {
      name: 'seller-signup-storage', // 저장소 이름
    }
  )
);
