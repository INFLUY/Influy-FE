export type FaqCardRequestBody = {
  questionContent: string;
  answerContent: string;
  backgroundImgLink: string | null;
  pinned: boolean;
  adjustImg: boolean;
};

export type FaqCardRequestType = {
  sellerId: number;
  itemId: number;
  faqCategoryId: number;
  data: FaqCardRequestBody;
};
