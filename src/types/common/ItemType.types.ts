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

export interface ItemDetail {
  itemId: number;
  itemPeriod: number;
  itemName: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  tagline: string;
  currentStatus: 'DEFAULT' | 'ON_SALE' | 'CLOSED'; // 예시: 상태 enum 확장 가능
  marketLink: string;
  isArchived: boolean;
  itemImgList: string[];
  itemCategoryList: string[];
  comment: string;
}
