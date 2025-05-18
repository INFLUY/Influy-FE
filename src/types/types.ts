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
  content: string;
  thumbnail: string | null;
  range: VisibilityOption[];
  open: string;
  deadline: string;
  status: 'basic' | 'extend' | 'sold out';
  pending: number;
  answered: number;
};

export type VisibilityOption = 'recommend' | 'search';
