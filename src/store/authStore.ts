import { CategoryType } from '@/types/common/CategoryType.types';
import { create } from 'zustand';

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

interface UserSignupState {
  id: string;
  email: string;
  intersetedCategories: CategoryType[];
  setId: (id: string) => void;
  setInterestedCategories: (categories: CategoryType[]) => void;
}

export const useUserSignupStore = create<UserSignupState>((set) => ({
  id: '',
  email: '',
  intersetedCategories: [],
  setId: (id: string) => set({ id }),
  setInterestedCategories: (intersetedCategories: CategoryType[]) =>
    set({ intersetedCategories }),
}));

interface SnsLinkProps {
  instagram: string;
  youtube: string;
  tiktok: string;
}

interface SellerSignupState {
  id: string;
  email: string;
  sns: SnsLinkProps;
  setId: (id: string) => void;
  setEmail: (email: string) => void;
  setSns: (sns: Partial<SnsLinkProps>) => void;
}

export const useSellerSignupStore = create<SellerSignupState>((set) => ({
  id: '',
  sns: {
    instagram: '',
    youtube: '',
    tiktok: '',
  },
  email: '',
  setId: (id: string) => set({ id }),
  setSns: (sns) =>
    set((state) => ({
      sns: {
        ...state.sns,
        ...sns,
      },
    })),
  setEmail: (email: string) => set({ email }),
}));
