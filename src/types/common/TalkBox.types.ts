export interface QuestionCategoryDTO {
  questionCategoryId: number;
  questionCategoryName: string; // 카테고리명 (예: 색상)
  questionCnt?: number; // 전체 질문 수
  unCheckedCnt?: number; // 답변 대기 수 (뱃지 표시용)
}

export interface QuestionDTO {
  questionId: number;
  memberId: number;
  username: string;
  tagName: string;
  content: string;
  nthQuestion: number;
  createdAt: string;
  new: boolean;
  profileImg: string | null;
  tagId: number;
}

export interface QuestionResponse {
  questions: QuestionDTO[];
  listSize: number;
  newQuestionCnt: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface CategoryTagsDTO {
  id: number | null;
  name: string;
  totalQuestions: number;
  uncheckedExists: boolean;
}

export interface TagAnswerResponse {
  tag: string;
  answerList: string[];
}

export type TALK_BOX_MODE = 'default' | 'select' | 'single' | 'bulk-reply';

export interface SingleQuestionAnswerDTO {
  questionDto: QuestionDTO;
  answerListDto: {
    answerViewList: {
      answerId: number;
      answerType: AnswerType;
      answerContent: string;
      answerTime: string;
    }[];
  };
}
export type AnswerType = 'INDIVIDUAL' | 'COMMON' | 'FAQ';

export interface CategoryListResponse {
  completedCnt: number;
  waitingCnt: number;
  completedCategoryList: QuestionCategoryDTO[];
  waitingCategoryList: QuestionCategoryDTO[];
}

export interface PostIndividualAnswerRequest {
  answerContent: string;
}

export interface PostIndividualAnswerResponse {
  questionId: number;
  answerId: number;
  answerType: AnswerType;
}
export interface PostBulkAnswerRequest {
  questionIdList: number[];
  answerContent: string;
}

export interface PostBulkAnswerResponse {
  answeredCnt: number;
  answerDtoList: {
    questionId: number;
    answerId: number;
    answerType: AnswerType;
  }[];
}

export interface GeneratedNameList {
  generatedNameList: string[];
}

export interface UserCategoryList {
  viewList: UserCategoryDTO[];
}

export interface UserCategoryDTO {
  questionCategoryId: number;
  questionCategoryName: string;
}
export type UserTalkBoxChat =
  | {
      type: 'Q';
      id: number;
      questionId?: number;
      categoryName: string;
      content: string;
      createdAt: string;
    }
  | {
      type: 'A';
      id: number;
      questionId: number;
      answerType: 'INDIVIDUAL' | 'COMMON' | 'FAQ';
      questionContent: string;
      content: string;
      createdAt: string;
    }
  | {
      type: 'Default Message';
      content: string;
    };

export interface UserMyQuestions {
  itemId: number;
  itemTitle: string;
  itemMainPic: string;
  sellerNickname: string;
  sellerProfilePic: string | null;
  lastChatContent: string;
  lastChatTime: string;
  uncheckedCnt: number;
  sellerId: number;
}
