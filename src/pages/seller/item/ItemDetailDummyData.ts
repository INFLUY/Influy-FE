import { ItemDetail, SellerCard } from '@/types/common/ItemType.types';
import { FAQCardList } from '@/types/common/FAQ.types';
import { ItemCategoryType } from '@/types/common/CategoryType.types';

export const dummySellerInfo: SellerCard = {
  id: 1,
  nickname: '소현',
  profileImg: '/profile.png',
  instagram: 'xoyeone_',
};

export const dummyItem: ItemDetail = {
  itemId: 1,
  itemPeriod: 2,
  itemName: '헤이드 리본 레이어드 티',
  startDate: '2025-06-07T09:00:00.660Z',
  endDate: '2025-07-07T09:00:00.660Z',
  tagline: '[소현X아로셀] 제작 / 살안타템 ',
  currentStatus: 'DEFAULT',
  marketLink: 'xxxx.com',
  isArchived: false,
  itemImgList: ['/product.png', '/img1.png', '/img1.png'],
  itemCategoryList: ['뷰티', '패션', '소품'],
  sellerInfo: dummySellerInfo,
  //comment, 할인가, 정상가 백에서 넘겨주는 데이터 형식에는 없음. 문의 필요
  comment:
    '10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는화점 명품 브랜드에 밀리지 않는 화점 명품 브랜드에 밀리지10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는화점 명품 브랜드에 밀리지 않는 화점 명품 브랜드에 밀리지브랜드에 밀리지브랜드에 밀리지브랜드에 밀리지',
  regularPrice: null,
  salePrice: null,
};

export const dummyCategory: ItemCategoryType[] = [
  { id: 0, name: '사이즈' },
  { id: 1, name: '색상' },
  { id: 2, name: '디테일' },
  { id: 3, name: '배송관련' },
  { id: 4, name: '색상1' },
  { id: 5, name: '색상2' },
  { id: 6, name: '사이즈1' },
  { id: 7, name: '사이즈2' },
  { id: 8, name: '사이즈' },
  { id: 9, name: '색상' },
  { id: 10, name: '디테일' },
  { id: 11, name: '배송관련' },
  { id: 12, name: '색상1' },
];

export const dummyFaq: FAQCardList[] = [
  {
    id: 0,
    pinned: true,
    questionContent: '키 155, 몸무게 50이면 M사이즈 맞을까요?',
    answerContent:
      '155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.',
    adjustImg: true,
    backgroundImgLink: '/product.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-07T09:00:00.660Z',
  },
  {
    id: 1,
    pinned: false,
    questionContent: '170cm에 65kg인데 L사이즈 괜찮을까요?',
    answerContent:
      '170/65라면 대체로 L사이즈가 잘 맞습니다. 다만 상체 비율에 따라 XL도 고려해 볼 수 있어요.',
    adjustImg: false,
    backgroundImgLink: '/img1.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-08T09:00:00.660Z',
  },
  {
    id: 2,
    pinned: false,
    questionContent: '키 165, 몸무게 55면 M이 맞을까요?',
    answerContent:
      '165cm, 55kg이면 평균적으로 M사이즈를 추천드립니다. 특히 허리 사이즈를 한번 더 확인해 주세요.',
    adjustImg: true,
    backgroundImgLink: '/product.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-09T09:00:00.660Z',
  },
  {
    id: 3,
    pinned: false,
    questionContent: '키 172, 몸무게 70이면 XL사이즈 선택해도 될까요?',
    answerContent:
      '172/70이라면 XL사이즈를 추천드리며, 조금 더 핏되게 입고 싶다면 L도 가능합니다.',
    adjustImg: false,
    backgroundImgLink: '/img1.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-10T09:00:00.660Z',
  },
  {
    id: 4,
    pinned: false,
    questionContent: '160에 45kg인데 S사이즈 괜찮나요?',
    answerContent:
      '160cm, 45kg 정도면 S사이즈가 무난합니다. 다만 품이 좁은 디자인이라면 M을 고려해보세요.',
    adjustImg: false,
    backgroundImgLink: '/product.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-11T09:00:00.660Z',
  },
  {
    id: 5,
    pinned: false,
    questionContent: '175cm 80kg L사이즈 가능할까요?',
    answerContent:
      '175/80이면 L사이즈는 조금 타이트할 수 있어 XL을 권장합니다.',
    adjustImg: false,
    backgroundImgLink: '/img1.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-12T09:00:00.660Z',
  },
  {
    id: 6,
    pinned: false,
    questionContent: '168cm 58kg M사이즈 맞는지 궁금해요',
    answerContent: '168/58 스펙이라면 M사이즈가 잘 맞을 확률이 높습니다.',
    adjustImg: false,
    backgroundImgLink: '/product.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-13T09:00:00.660Z',
  },
  {
    id: 7,
    pinned: false,
    questionContent: '키 162, 몸무게 70이면 L사이즈 가능할까요?',
    answerContent:
      '조금 핏되게 입으신다면 L사이즈, 여유있게 입으신다면 XL사이즈를 추천합니다.',
    adjustImg: false,
    backgroundImgLink: '/img1.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-14T09:00:00.660Z',
  },
  {
    id: 8,
    pinned: false,
    questionContent: '키 150, 48kg S사이즈 맞을까요?',
    answerContent:
      '150cm, 48kg면 S사이즈가 적당합니다. 허리 둘레가 타이트할 수 있으니 체크해 주세요.',
    adjustImg: false,
    backgroundImgLink: '/product.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-15T09:00:00.660Z',
  },
  {
    id: 9,
    pinned: false,
    questionContent: '180cm 75kg L사이즈 괜찮은지요?',
    answerContent:
      '180/75라면 L사이즈도 가능하지만 상체가 발달했으면 XL을 권장합니다.',
    adjustImg: false,
    backgroundImgLink: '/img1.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-16T09:00:00.660Z',
  },
  {
    id: 10,
    pinned: false,
    questionContent: '키 158, 몸무게 52kg M사이즈 어떨까요?',
    answerContent:
      '158/52라면 M사이즈가 적당하지만 좀 더 여유있게 입으시려면 L사이즈도 괜찮습니다.',
    adjustImg: false,
    backgroundImgLink: '/product.png',
    faqCategory: '사이즈',
    updatedAt: '2025-06-17T09:00:00.660Z',
  },
];
