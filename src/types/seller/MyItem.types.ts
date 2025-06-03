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
