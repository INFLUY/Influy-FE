import { TalkBoxItem, QuestionCategory } from '@/types/seller/TalkBox.types';

export const dummyTalkBoxItems: TalkBoxItem[] = [
  {
    id: 1,
    title: '[테스트1] 하트 퍼퓸 스프레이 에디션',
    thumbnailUrl: '/img1.png',
    pendingCount: 23,
    answeredCount: 51,
    badge: 13,
  },
  {
    id: 2,
    title: '[스페셜] 히알루론 앰플 세트 구성',
    thumbnailUrl: '/product.png',
    pendingCount: 135,
    answeredCount: 135,
    badge: 0,
  },
  {
    id: 3,
    title: '[클린뷰티] 천연 비누 3종 패키지',
    thumbnailUrl: '/img1.png',
    pendingCount: 45,
    answeredCount: 90,
    badge: 123,
  },
  {
    id: 4,
    title: '[그린라인] 모공수렴 토너 & 젤 클렌저',
    thumbnailUrl: null,
    pendingCount: 12,
    answeredCount: 77,
    badge: 4,
  },
];
export const dummyQuestionCategories: QuestionCategory[] = [
  {
    id: 1,
    name: '색상',
    totalCount: 24,
    pendingCount: 10,
  },
  {
    id: 2,
    name: '사이즈',
    totalCount: 20,
    pendingCount: 12,
  },
  {
    id: 3,
    name: '가격',
    totalCount: 12,
    pendingCount: 20,
  },
  {
    id: 4,
    name: '배송',
    totalCount: 8,
    pendingCount: 0,
  },
];
