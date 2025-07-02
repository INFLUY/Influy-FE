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
// import { ItemDetail, SellerCard } from '@/types/common/ItemType.types';
import { SnackBar } from '@/components';
import { useState, useEffect, useRef } from 'react';
import { BottomNavItem } from '@/components/common/BottomNavBar';
import Link2Icon from '@/assets/icon/common/Link2Icon.svg?react';
import LockIcon from '@/assets/icon/common/LockIcon.svg?react';
import EditIcon from '@/assets/icon/common/EditIcon.svg?react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { CategoryType } from '@/types/common/CategoryType.types';
// import { FAQCardList } from '@/types/common/FAQ.types';
import { dummyCategory, dummyFaq, dummyItem } from './ItemDetailDummyData';

const SellerItemDetailPage = () => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const [isFaqCategoryTop, setIsFaqCategoryTop] = useState(false);
  const [isDetailOnScreen, setIsDetailOnScreen] = useState(true);
  const categoryAnchorRef = useRef<HTMLDivElement>(null);
  const itemDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 1) itemDetailRef 가 보일 때는 무조건 false
          if (entry.target === itemDetailRef.current) {
            if (entry.isIntersecting) {
              setIsFaqCategoryTop(false);
              setIsDetailOnScreen(true);
              return;
            } else setIsDetailOnScreen(false);
          }
          // 2) categoryAnchorRef 가 '56px 선 위로' 벗어났을 때만 true
          else if (entry.target === categoryAnchorRef.current) {
            if (isDetailOnScreen) {
              setIsFaqCategoryTop(false);
            } else {
              setIsFaqCategoryTop(!entry.isIntersecting);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-56px 0px 0px 0px',
      }
    );

    if (categoryAnchorRef.current) observer.observe(categoryAnchorRef.current);
    if (itemDetailRef.current) observer.observe(itemDetailRef.current);
    return () => observer.disconnect();
  }, [isDetailOnScreen]);

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
      {isFaqCategoryTop ? (
        <header className="sticky top-0 z-50 flex w-full flex-nowrap gap-2 bg-[rgba(241,241,241,0.30)]">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-scroll px-5 pt-2 pb-[.4375rem]">
            {dummyCategory.map((category: CategoryType) => (
              <CategoryChip
                key={category.id}
                text={category.category}
                isSelected={selectedCategory == category.id}
                onToggle={() => setSelectedCategory(category.id)}
                theme="faq"
              />
            ))}
          </div>
        </header>
      ) : (
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
      )}

      {/* 상단 스크롤을 위한 ref */}
      <div className="invisible" ref={scrollViewRef} />

      {/* 상단 상품 정보 파트 */}
      <ItemDetailInfo data={dummyItem} status={status} ref={itemDetailRef} />

      {/* FAQ 파트 */}
      <section className="mt-8 flex w-full flex-col gap-4">
        <article className="flex flex-col gap-[1.125rem]">
          <h2 className="text-grey11 body1-b px-5">FAQ</h2>
          <div className="relative px-5">
            {/* ref */}
            <div
              ref={categoryAnchorRef}
              className="absolute bottom-0 left-0 z-19 h-[1px] w-60"
            />

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
            {isFaqCategoryTop && (
              <div className="absolute top-0 z-1 h-full w-full bg-white" />
            )}
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
