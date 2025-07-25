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

export interface ItemCardType {
  itemId: number;
  itemPeriod: number | null;
  itemName: string;
  startDate: string | null; // ISO string
  endDate: string | null; // ISO string
  tagline: string | null;
  currentStatus: 'DEFAULT' | 'EXTEND' | 'SOLD_OUT'; // 예시: 상태 enum 확장 가능
  sellerName: string;
  mainImg: string | null;
  isScrapped: boolean;
}

export interface ItemDetail {
  itemId: number;
  itemPeriod: number | null;
  itemName: string;
  startDate: string | null; // ISO string
  endDate: string | null; // ISO string
  tagline: string | null;
  currentStatus: 'DEFAULT' | 'ON_SALE' | 'CLOSED'; // 예시: 상태 enum 확장 가능
  marketLink: string | null;
  isArchived: boolean;
  itemImgList: string[] | null;
  itemCategoryList: string[] | null;
  comment: string | null;
  regularPrice: number | null;
  salePrice: number | null;
  sellerInfo: SellerCard;
}

export type ItemStatus = 'archived' | 'published' | null;

export interface SellerCard {
  id: number;
  nickname: string;
  profileImg: string;
  instagram: string;
}

export type FaqQuestion = {
  id: number;
  questionContent: string;
  pinned: true;
  updatedAt: string;
};

export interface ItemOverviewDTO {
  id: number;
  itemName: string;
  tagline: string;
  mainImg: string;
  talkBoxOpenStatus: TalkBoxOpenStatus;
}
export type TalkBoxOpenStatus = 'INITIAL' | 'OPENED' | 'CLOSED';
