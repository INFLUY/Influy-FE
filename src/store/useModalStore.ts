import { create } from 'zustand';

interface ModalConfig {
  text: string;
  description?: string;
  leftButtonText?: string;
  leftButtonClick?: () => void;
  rightButtonText?: string;
  rightButtonClick: () => void;
  onClose?: () => void;
}

interface ModalState {
  isOpen: boolean;
  config: ModalConfig | null;
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  config: null,
  showModal: (config) =>
    set({
      isOpen: true,
      config: {
        ...config,
        leftButtonClick: config.leftButtonClick || (() => get().hideModal()),
      },
    }),
  hideModal: () => set({ isOpen: false, config: null }),
}));
