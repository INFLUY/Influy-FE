import { SetStateAction } from 'react';

export type ItemType = {
  itemId: number;
  title: string;
  name: string;
  content?: string;
  thumbnail: string | null;
  open: string;
  deadline: string;
  scrapped: boolean;
  extend?: boolean;
  soldOut?: boolean;
};

// 셀러가 보는 자신의 아이템
export type MyItem = {
  itemId: number;
  title: string;
  thumbnail: string | null;
  open: string;
  deadline: string;
  status: 'basic' | 'sold out';
  pending: number;
  answered: number;
};

export type NoticeType = {
  id: number;
  title: string;
  date: string;
  content: string;
  isPrimary?: boolean;
};

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
