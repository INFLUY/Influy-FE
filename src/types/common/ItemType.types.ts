export type SellerItemPreviewList = {
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
  itemPreviewList: SellerItemPreviewList[] | [];
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

export type ItemPreviewList = {
  itemId: number;
  sellerId: number;
  itemPeriod: number;
  itemName: string;
  sellerName: string;
  startDate: string;
  endDate: string;
  tagline: string;
  currentStatus: 'DEFAULT' | 'EXTEND' | 'SOLD_OUT';
  liked: false;
  mainImg: string;
};

export interface ItemOverviewDTO {
  id: number;
  itemName: string;
  tagline: string;
  mainImg: string;
  talkBoxOpenStatus: TalkBoxOpenStatus;
}
export type TalkBoxOpenStatus = 'INITIAL' | 'OPENED' | 'CLOSED';

export interface TalkBoxOpenStatusResponse {
  itemId: number;
  status: TalkBoxOpenStatus;
}

export interface TalkBoxOpenedListDTO {
  talkBoxOpenedDtoList: TalkBoxOpenedItem[];
  cnt: number;
  isItemExist: boolean;
}

export interface TalkBoxOpenedItem {
  itemId: number;
  itemMainImg: string;
  itemName: string;
  talkBoxCntInfo: TalkBoxCntInfo;
  newCnt: number;
}

export interface TalkBoxCntInfo {
  talkBoxOpenStatus: TalkBoxOpenStatus;
  waitingCnt: number;
  completedCnt: number;
}

export interface TalkBoxCommentDTO {
  sellerId: number;
  sellerProfileImg: string | null;
  sellerUsername: string;
  sellerNickname: string;
  createdAt: string; // ISO 8601 datetime string
  talkBoxComment: string;
}
