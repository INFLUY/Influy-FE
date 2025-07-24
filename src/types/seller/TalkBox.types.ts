//임시
export interface TalkBoxItem {
  id: number; // 고유 ID
  title: string; // 상품 제목 (브랜드명 포함)
  thumbnailUrl: string | null; // 썸네일 이미지 경로
  pendingCount: number; // 답변 대기 수
  answeredCount: number; // 답변 완료 수
  badge: number; // 빨간 알림 배지 숫자 (0이면 표시 안 함)
}

export interface QuestionCategoryDTO {
  questionCategoryId: number;
  questionCategoryName: string; // 카테고리명 (예: 색상)
  questionCnt?: number; // 전체 질문 수
  unCheckedCnt?: number; // 답변 대기 수 (뱃지 표시용)
}

export interface TalkBoxQuestionDTO {
  id: number;
  memberId: number;
  nickname: string;
  username: string;
  content: string;
  nthQuestion: number;
  createdAt: string;
}

export interface TalkBoxQuestionListResponse {
  questions: TalkBoxQuestionDTO[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface SubCategory {
  id: number;
  text: string;
  totalCount: number;
  newCount?: number;
}

export interface Chat {
  questionId: number;
  content: string;
  createdAt: string;
  memberId: number;
  profileImg: string | null;
  username: string;
  askedCount: number;
  isChecked: boolean;
}

export type TALK_BOX_MODE = 'default' | 'select' | 'single' | 'answered';
