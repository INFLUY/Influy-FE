import { create } from 'zustand';

interface SnackbarState {
  message: string | null;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: null,
  showSnackbar: (message) => set({ message }),
  hideSnackbar: () => set({ message: null }),
}));
