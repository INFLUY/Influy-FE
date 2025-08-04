import { CategoryType } from './CategoryType.types';

// export interface FAQCardList {
//   id: number;
//   pinned: boolean;
//   adjustImg: boolean;
//   questionContent: string;
//   answerContent: string;
//   backgroundImgLink: string;
//   faqCategory: string;
//   updatedAt: string;
// }

// export interface FAQListResponse {
//   faqCardList: FAQCardList[];
//   listSize: number;
//   totalPage: number;
//   totalElements: number;
//   isFirst: boolean;
//   isLast: boolean;
// }

export interface FAQCategoryResponse {
  viewList: CategoryType[];
  listSize: number;
}
