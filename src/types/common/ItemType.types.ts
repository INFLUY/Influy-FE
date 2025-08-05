export type SellerItemPreviewList = {
  itemId: number;
  sellerId: number;
  itemPeriod: number;
  itemName: string;
  sellerName: string;
  startDate: string | null;
  endDate: string | null;
  tagline: string | null;
  currentStatus: ItemCurrentStatusType;
  liked: false;
  talkBoxInfo: {
    talkBoxOpenStatus: TalkBoxOpenStatusType;
    waitingCnt: number;
    completedCnt: number;
  };
  mainImg: string | null;
  isDateUndefined: boolean;
};

export interface ItemCardType {
  sellerProfileImg: string | null;
  sellerUsername: string;
  sellerNickname: string;
  sellerId: number;
  itemId: number;
  itemMainImg: string;
  itemPeriod: number;
  itemName: string;
  startDate: string;
  endDate: string;
  tagline: string | null;
  currentStatus: ItemCurrentStatusType;
  liked: boolean;
}

export interface ItemDetail {
  itemId: number;
  itemPeriod: number | null;
  itemName: string;
  startDate: string | null; // ISO string
  endDate: string | null; // ISO string
  tagline: string | null;
  currentStatus: ItemCurrentStatusType;
  marketLink: string | null;
  isArchived: boolean;
  itemImgList: string[] | [];
  itemCategoryList: number[] | [];
  comment: string | null;
  regularPrice: number | null;
  salePrice: number | null;
  status: ItemCurrentStatusType;
  isDateUndefined: boolean;
  sellerInfo: SellerCard;
  talkBoxOpenStatus: 'INITIAL' | 'OPENED' | 'CLOSED';
}

export interface ItemPostDetail {
  itemImgList: string[];
  name: string;
  itemCategoryIdList: string[];
  startDate?: string;
  endDate?: string;
  tagline?: string;
  regularPrice?: number;
  salePrice?: number;
  marketLink?: string;
  itemPeriod: number;
  comment?: string;
  isArchived: boolean;
  isDateUndefined: boolean;
  status?: ItemCurrentStatusType;
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
  currentStatus: ItemCurrentStatusType;
  liked: false;
  mainImg: string;
};

export type ItemCurrentStatusType = 'DEFAULT' | 'EXTEND' | 'SOLD_OUT';

export type SellerHomeItemStatus = {
  itemId: number;
  imageUrl: string;
  itemStatus: ItemCurrentStatusType;
  itemPeriod: number;
  itemTitle: string;
  startDate: string;
  endDate: string;
  totalPendingQuestions: number;
  newQuestions: number;
  topCategories: string[] | [] | null;
};

export type ItemSortType = 'END_DATE' | 'CREATE_DATE';

export type TalkBoxOpenStatusType = 'INITIAL' | 'OPENED' | 'CLOSED';

export interface ItemOverviewDTO {
  id: number;
  itemName: string;
  tagline: string;
  mainImg: string;
  talkBoxOpenStatus: TalkBoxOpenStatusType;
}

export interface TalkBoxOpenStatusResponse {
  itemId: number;
  status: TalkBoxOpenStatusType;
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
  talkBoxOpenStatus: TalkBoxOpenStatusType;
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
