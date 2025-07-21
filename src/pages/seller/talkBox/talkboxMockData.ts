import {
  TalkBoxItem,
  QuestionCategory,
  SubCategory,
  Chat,
} from '@/types/seller/TalkBox.types';

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
    questionCategory: '색상',
    totalCount: 24,
    pendingCount: 10,
  },
  {
    id: 2,
    questionCategory: '사이즈',
    totalCount: 20,
    pendingCount: 12,
  },
  {
    id: 3,
    questionCategory: '가격',
    totalCount: 12,
    pendingCount: 20,
  },
  {
    id: 4,
    questionCategory: '배송',
    totalCount: 8,
    pendingCount: 0,
  },
];

export const dummySubCategories: SubCategory[] = [
  {
    id: 0,
    text: '네이비',
    totalCount: 12,
    newCount: 3,
  },
  {
    id: 1,
    text: '색바램',
    totalCount: 5,
    newCount: 3,
  },
  {
    id: 2,
    text: '물빠짐',
    totalCount: 3,
    newCount: 0,
  },
  {
    id: 3,
    text: '블랙',
    totalCount: 4,
    newCount: 0,
  },
  { id: 4, text: '기타', totalCount: 4, newCount: 0 },
];

export const dummyChats: Chat[] = [
  {
    questionId: 1,
    content:
      '네이비 색상 옷 구매하려고 하는데요, 세탁할 때 물빠짐이 많이 심한 편인가요? 실제로 입어보셨을 때 어떤지 궁금해요!',
    createdAt: '2025-07-18T02:15:00',
    memberId: 101,
    profileImg: '/profile1.png',
    username: 'dpdms02',
    askedCount: 4,
    isChecked: false,
  },
  {
    questionId: 2,
    content: '물빠짐 심하면 다른 옷에 이염되진 않을까요? 확인 부탁드려요.',
    createdAt: '2025-07-16T14:30:00',
    memberId: 102,
    profileImg: '/profile2.png',
    username: 'user123',
    askedCount: 1,
    isChecked: false,
  },
  {
    questionId: 3,
    content: '세탁 시 따로 분리 세탁하는 게 좋을까요? 고민되네요.',
    createdAt: '2025-07-10T09:45:00',
    memberId: 103,
    profileImg: null,
    username: 'bluebuyer',
    askedCount: 2,
    isChecked: true,
  },
];

export const dummyChats2: Chat[] = [
  {
    questionId: 11,
    content:
      '아이디2 네이비 색상 옷 구매하려고 하는데요, 세탁할 때 물빠짐이 많이 심한 편인가요? 실제로 입어보셨을 때 어떤지 궁금해요!',
    createdAt: '2025-07-18T02:15:00',
    memberId: 101,
    profileImg: '/profile1.png',
    username: 'dpdms02',
    askedCount: 4,
    isChecked: false,
  },
  {
    questionId: 12,
    content:
      '아이디2 물빠짐 심하면 다른 옷에 이염되진 않을까요? 확인 부탁드려요.',
    createdAt: '2025-07-16T14:30:00',
    memberId: 102,
    profileImg: '/profile2.png',
    username: 'user123',
    askedCount: 1,
    isChecked: false,
  },
  {
    questionId: 13,
    content: '아이디2 세탁 시 따로 분리 세탁하는 게 좋을까요? 고민되네요.',
    createdAt: '2025-07-10T09:45:00',
    memberId: 103,
    profileImg: null,
    username: 'bluebuyer',
    askedCount: 2,
    isChecked: true,
  },
];
