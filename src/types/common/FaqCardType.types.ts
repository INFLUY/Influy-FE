export type FaqCardRequestBody = {
  faqCategoryId?: number;
  questionContent: string;
  answerContent: string;
  backgroundImgLink: string;
  pinned: boolean;
  adjustImg: boolean;
};

export type FaqCardRequestType = {
  sellerId: number;
  itemId: number;
  faqCategoryId?: number;
  data: FaqCardRequestBody;
};

export type FaqCardDetailResponse = {
  id: number;
  pinned: boolean;
  adjustImg: boolean;
  questionContent: string;
  answerContent: string;
  backgroundImgLink: string;
  faqCategoryId: number;
  updatedAt: string;
};
