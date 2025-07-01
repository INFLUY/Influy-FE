export interface FAQCardList {
  id: number;
  pinned: boolean;
  adjustImg: boolean;
  questionContent: string;
  answerContent: string;
  backgroundImgLink: string;
  faqCategory: string;
  updatedAt: string;
}

export interface FAQListResponse {
  faqCardList: FAQCardList[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}
