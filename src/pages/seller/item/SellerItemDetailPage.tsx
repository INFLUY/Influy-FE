import { useNavigate, useLocation } from 'react-router-dom';
import {
  ItemDetailInfo,
  PageHeader,
  BottomNavBar,
  ItemDetailFaqCard,
  CategoryChip,
} from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import { ItemDetail, SellerCard } from '@/types/common/ItemType.types';
import { SnackBar } from '@/components';
import { useState, useEffect } from 'react';
import { BottomNavItem } from '@/components/common/BottomNavBar';
import Link2Icon from '@/assets/icon/common/Link2Icon.svg?react';
import LockIcon from '@/assets/icon/common/LockIcon.svg?react';
import EditIcon from '@/assets/icon/common/EditIcon.svg?react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { CategoryType } from '@/types/common/CategoryType.types';
import { FAQCardList } from '@/types/common/FAQ.types';

const dummySellerInfo: SellerCard = {
  id: 1,
  nickname: '소현',
  profileImg: '/profile.png',
  instagram: 'xoyeone_',
};

const dummyItem: ItemDetail = {
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

const dummyCategory: CategoryType[] = [
  { id: 0, category: '사이즈' },
  { id: 1, category: '색상' },
  { id: 2, category: '디테일' },
  { id: 3, category: '배송관련' },
  { id: 4, category: '색상1' },
  { id: 5, category: '색상2' },
  { id: 6, category: '사이즈1' },
  { id: 7, category: '사이즈2' },
];

const dummyFaq: FAQCardList[] = [
  {
    id: 0,
    pinned: true,
    questionContent: '키 155, 몸무게 50이면 M사이즈 맞을까요?',
    answerContent:
      '155cm, 50kg라면 M사이즈가 적당합니다. 상체나 하체 발달에 따라 차이가 있을 수 있으니 실측을 꼭 참고하세요.',
    adjustImg: false,
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
    adjustImg: false,
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

const SellerItemDetailPage = () => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const status = location.pathname.endsWith('/archived')
    ? 'archived'
    : location.pathname.endsWith('/published')
      ? 'published'
      : null;

  useEffect(() => {
    if (location.state?.isSnackbar == true) {
      const message: string =
        status === 'published'
          ? '상품이 게시되었습니다.'
          : '상품이 보관되었습니다.';
      setSnackbar({ open: true, message });
      //state 초기화
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 하단바
  const handleGoToPage = () => {};
  const handleOpenScopeModal = () => {};
  const detailBottomNavItems: BottomNavItem[] = [
    {
      label: '판매 페이지',
      onClick: handleGoToPage,
      icon: <Link2Icon className="h-6 w-6" />,
      aria: '판매 페이지로 이동',
    },
    {
      label: '공개 범위',
      onClick: handleOpenScopeModal,
      icon: <LockIcon className="h-6 w-6" />,
      aria: '공개 범위 설정',
    },
    {
      label: '상품 수정',
      onClick: () => {
        navigate('/my-market/item/new'); //추후 수정페이지로 라우팅 수정 필요
      },
      icon: <EditIcon className="h-6 w-6" />,
      aria: '상품 수정',
    }, //추후 상품 페이지로 이동하도록 수정 필요
  ];
  const scrollViewRef = useScrollToTop(); // 기본: 상단 스크롤

  return (
    <>
      {/* 헤더 */}
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
            role="button"
            aria-label="뒤로 가기"
          />,
        ]}
        rightIcons={[
          <ShareIcon className="h-6 w-6 cursor-pointer text-black" />,
          <StatisticIcon className="h-6 w-6 cursor-pointer text-black" />,
        ]}
        additionalStyles="bg-white"
      >
        <div className="h-[1.6875rem]" />
      </PageHeader>

      {/* 상단 스크롤을 위한 ref */}
      <div className="invisible" ref={scrollViewRef} />

      {/* 상단 상품 정보 파트 */}
      <ItemDetailInfo data={dummyItem} status={status} />

      {/* FAQ 파트 */}
      <section className="mt-8 flex w-full flex-col gap-4">
        <article className="flex flex-col gap-[1.125rem]">
          <h2 className="text-grey11 body1-b px-5">FAQ</h2>
          <div className="px-5">
            <article className="flex w-full flex-wrap gap-2">
              {dummyCategory.map((category: CategoryType) => (
                <CategoryChip
                  key={category.id}
                  text={category.category}
                  isSelected={selectedCategory == category.id}
                  onToggle={() => setSelectedCategory(category.id)}
                  theme="faq"
                />
              ))}
            </article>
          </div>
        </article>
        <ItemDetailFaqCard faqList={dummyFaq} />
      </section>

      {/* 스낵바 */}
      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
      )}
      <BottomNavBar items={detailBottomNavItems} type="action" />
    </>
  );
};
export default SellerItemDetailPage;
