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

export type FaqCardDetailReponse = {
  id: number;
  pinned: boolean;
  adjustImg: boolean;
  questionContent: string;
  answerContent: string;
  backgroundImgLink: string;
  faqCategoryId: number;
  updatedAt: string;
};

export interface QuestionCardListType {
  id: number;
  questionContent: string;
  pinned: boolean;
  updatedAt: string;
}
