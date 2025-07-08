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
