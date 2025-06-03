import { SetStateAction } from 'react';

// 모달 props
export interface SellerModalProps {
  text: string;
  description?: string;
  leftButtonText?: string;
  leftButtonClick?: () => void;
  rightButtonText?: string;
  rightButtonClick: () => void;
  onClose?: () => void;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}
