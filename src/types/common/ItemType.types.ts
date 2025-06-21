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
  startDate: string | null; // ISO string
  endDate: string | null; // ISO string
  tagline: string | null;
  currentStatus: 'DEFAULT' | 'ON_SALE' | 'CLOSED'; // 예시: 상태 enum 확장 가능
  marketLink: string;
  isArchived: boolean;
  itemImgList: string[];
  itemCategoryList: string[];
  comment: string | null;
  regularPrice: number;
  salePrice: number | null;
  sellerInfo: SellerCard;
}

export type ItemStatus = 'saved' | 'published';

export interface SellerCard {
  id: number;
  nickname: string;
  profileImg: string;
  instagram: string;
}
