import { SetStateAction } from 'react';

// 모달 props
export interface SellerModalProps {
  text: string;
  description?: string;
  leftButtonText?: string;
  leftButtonClick?: (arg?: any) => void;
  rightButtonText?: string;
  rightButtonClick: (arg?: any) => void;
  onClose?: () => void;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}
