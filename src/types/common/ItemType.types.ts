export type ItemPreviewList = {
  itemId: number;
  sellerId: number;
  itemPeriod: number;
  itemName: string;
  sellerName: string;
  startDate?: string;
  endDate?: string;
  tagline?: string;
  currentStatus: 'DEFAULT' | 'EXTEND' | 'SOLD_OUT';
  liked: false;
  talkBoxInfo: {
    talkBoxOpenStatus: 'INITIAL' | 'OPENED' | 'CLOSED';
    waitingCnt: number;
    completedCnt: number;
  };
  mainImg: string;
};

export type SellerItemsResponse = {
  itemPreviewList: ItemPreviewList[] | [];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
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
  sellerId: number;
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
  itemImgList: string[] | [];
  itemCategoryList: string[] | [];
  comment: string | null;
  regularPrice: number | null;
  salePrice: number | null;
  sellerInfo: SellerCard;
}

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

export type itemPreviewList = {
  itemId: number;
  itemPeriod: number;
  itemName: string;
  sellerName: string;
  startDate: string;
  endDate: string;
  tagline: string;
  currentStatus: 'DEFAULT' | 'ON_SALE' | 'CLOSED';
  liked: false;
  mainImg: string;
};
