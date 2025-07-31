import { create } from 'zustand';

type SnackbarType = 'default' | 'error';

interface SnackbarState {
  message: string | null;
  type: SnackbarType;
  showSnackbar: (message: string, type?: SnackbarType) => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: null,
  type: 'default',
  showSnackbar: (message, type = 'default') => set({ message, type }),
  hideSnackbar: () => set({ message: null, type: 'default' }),
}));
