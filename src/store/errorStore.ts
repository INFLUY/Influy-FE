import { create } from 'zustand';

interface ErrorState {
  errorMessage: string | null;
  showError: (message: string) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: null,
  showError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),
}));
