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

interface UserSignupState {
  id: string;
  email: string;
  intersetedCategories: number[];
}

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

export const useSellerSignupStore = create<SellerSignupState>()(
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
      setSns: (sns) =>
        set((state) => ({
          sns: {
            ...state.sns,
            ...sns,
          },
        })),
      setEmail: (email: string) => set({ email }),
    }),
    {
      name: 'seller-signup-storage', // 저장소 이름
    }
  )
);
