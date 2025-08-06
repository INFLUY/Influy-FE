import { useState, useEffect, useRef, lazy, Suspense } from 'react';

import {
  PageHeader,
  BottomNavBar,
  CategoryChip,
  VisibilityBottomSheet,
  LoadingSpinner,
  AddButton,
} from '@/components';
import { FloatingButton } from '@/components/seller/item/itemDetail/FloatingButton';
// icon
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import Link2Icon from '@/assets/icon/common/Link2Icon.svg?react';
import LockIcon from '@/assets/icon/common/LockIcon.svg?react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';

// path
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import {
  SELLER_ITEM_EDIT_PATH,
  SELLER_ITEM_FAQ_REGISTER_PATH,
} from '@/utils/generatePath';

// type
import { BottomNavItem } from '@/components/common/BottomNavBar';
import { CategoryType } from '@/types/common/CategoryType.types';

// hooks & utils
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useCopyMarketUrl } from '@/utils/useCopyUrl';
import { useSnackbarStore } from '@/store/snackbarStore';

// api
import { useGetMarketItemDetailSuspense } from '@/services/sellerItem/query/useGetMarketItemDetail';
import { useGetItemFaqCategory } from '@/services/sellerFaqCard/query/useGetItemFaqCategory';
import { useGetFaqCardByCategory } from '@/services/sellerFaqCard/query/useGetFaqCardByCategory';

const ItemDetailFaqCard = lazy(
  () => import('@/components/common/item/itemDetail/ItemDetailFaqCard')
);

import ItemDetailInfo from '@/components/common/item/itemDetail/ItemDetailInfo';
// const FaqCategorySection = lazy(
//   () => import('@/components/common/item/itemDetail/FaqCategorySection')
// );

const SellerItemDetailPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { itemId } = useParams();
  const { sellerId } = useStrictId();

  const [isFaqCategoryTop, setIsFaqCategoryTop] = useState(false);
  const [isDetailOnScreen, setIsDetailOnScreen] = useState(true);
  // 툴팁 표시 여부
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const categoryAnchorRef = useRef<HTMLDivElement>(null);
  const itemDetailRef = useRef<HTMLDivElement>(null);

  const copyUrl = useCopyMarketUrl(sellerId);

  const { data: itemDetailData, isPending: isItemDetailPending } =
    useGetMarketItemDetailSuspense({
      sellerId: Number(sellerId),
      itemId: Number(itemId),
    });

  useEffect(() => {
    setShowTooltip(true);
    const timer = window.setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [itemDetailData?.talkBoxOpenStatus]);

  // 하단바
  const handleGoToPage = () => {
    window.open(itemDetailData?.marketLink ?? '', '_blank', 'noreferrer');
  };
  const handleOpenScopeModal = () => {
    setIsBottomSheetOpen(true);
  };

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
        navigate(generatePath(SELLER_ITEM_EDIT_PATH, { itemId }));
      },
      icon: <EditIcon className="h-6 w-6" />,
      aria: '상품 수정',
    },
  ];

  const scrollViewRef = useScrollToTop(); // 기본: 상단 스크롤

  //api : faq 카테고리
  const { data: faqCategories, isPending: isFaqCategoryPending } =
    useGetItemFaqCategory({
      sellerId: Number(sellerId),
      itemId: Number(itemId),
    });

  useEffect(() => {
    if (faqCategories && faqCategories.length > 0)
      setSelectedCategoryId(faqCategories[0].id);
  }, [faqCategories]);

  useEffect(() => {
    if (isItemDetailPending || isFaqCategoryPending) return;

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
  }, [isDetailOnScreen, isItemDetailPending, isFaqCategoryPending]);

  const {
    data: faqCardList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFaqCardByCategory({
    sellerId: Number(sellerId),
    itemId: Number(itemId),
    faqCategoryId: selectedCategoryId,
  });

  const flattenedFaqCardList = faqCardList?.pages.flatMap(
    (page) => page?.faqCardList ?? []
  );

  const handleTalkBoxButtonClick = () => {
    if (itemDetailData?.talkBoxOpenStatus === 'OPENED') {
      navigate(
        generatePath(
          `${PATH.SELLER.BASE}/${PATH.SELLER.TALK_BOX.BASE}/${PATH.SELLER.TALK_BOX.ITEM.BASE}`,
          { itemId: String(itemId) }
        )
      );
      return;
    }
    if (itemDetailData?.talkBoxOpenStatus === 'INITIAL') {
      navigate(
        generatePath(
          `${PATH.SELLER.BASE}/${PATH.SELLER.TALK_BOX.BASE}/${PATH.SELLER.TALK_BOX.ONBOARDING.BASE}`,
          { itemId: String(itemId) }
        )
      );
      return;
    }
    if (itemDetailData?.talkBoxOpenStatus === 'CLOSED') {
      navigate(
        generatePath(
          `${PATH.SELLER.BASE}/${PATH.SELLER.TALK_BOX.BASE}/${PATH.SELLER.TALK_BOX.ITEM.BASE}/${PATH.SELLER.TALK_BOX.ITEM.SETTING.BASE}`,
          { itemId: String(itemId) }
        )
      );
      return;
    }
  };
  // TODO: 카테고리 바뀌어도 스크롤바 위치 안 바뀌게 하기

  return (
    <div className="flex w-full flex-col pb-[4.125rem]">
      {/* 헤더 */}
      {isFaqCategoryTop ? (
        <header className="sticky top-0 z-20 flex w-full flex-nowrap gap-2 bg-[rgba(241,241,241,0.30)]">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-scroll px-5 pt-2 pb-[.4375rem]">
            {faqCategories.length > 0 &&
              faqCategories.map((category: CategoryType) => (
                <CategoryChip
                  key={category.id}
                  text={category.name}
                  isSelected={selectedCategoryId == category.id}
                  onToggle={() => setSelectedCategoryId(category.id)}
                  theme="faq"
                />
              ))}
          </div>
        </header>
      ) : (
        <>
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
              <ShareIcon
                className="h-6 w-6 cursor-pointer text-black"
                onClick={() => copyUrl()}
              />,
              <StatisticIcon
                className="h-6 w-6 cursor-pointer text-black"
                onClick={() => showSnackbar('준비중입니다.')}
              />,
            ]}
            additionalStyles="bg-white"
          >
            <div className="h-[1.6875rem]" />
          </PageHeader>
          <span className="flex h-11 w-full shrink-0" />
        </>
      )}

      {/* 상단 스크롤을 위한 ref */}
      <div className="invisible" ref={scrollViewRef} />

      {/* 상단 상품 정보 파트 */}
      <Suspense fallback={<LoadingSpinner />}>
        {itemDetailData && (
          <ItemDetailInfo
            data={itemDetailData}
            sellerId={Number(sellerId)}
            ref={itemDetailRef}
          />
        )}
      </Suspense>

      {/* FAQ 파트 */}
      <section className="mt-8 flex w-full flex-col gap-4">
        <article className="flex flex-col gap-[1.125rem]">
          <div className="flex w-full items-center justify-between px-5">
            <h2 className="text-grey11 body1-b">FAQ</h2>
            <Suspense fallback={null}>
              {faqCategories.length > 0 && (
                <button
                  className="flex items-center gap-1"
                  type="button"
                  onClick={() => {}}
                >
                  <span className="body2-m text-grey06">카테고리 수정</span>
                  <EditIcon className="text-grey09 h-3.5 w-3.5" />
                </button>
              )}
            </Suspense>
          </div>

          <div className="relative px-5">
            <Suspense fallback={<LoadingSpinner />}>
              {/* ref */}
              {itemDetailRef.current && (
                <div
                  ref={categoryAnchorRef}
                  className="absolute bottom-0 left-0 z-19 h-[1px] w-60"
                />
              )}
              <article className="flex w-full flex-wrap gap-2">
                {faqCategories.length > 0 ? (
                  faqCategories.map((category: CategoryType) => (
                    <CategoryChip
                      key={category.id}
                      text={category.name}
                      isSelected={selectedCategoryId == category.id}
                      onToggle={() => setSelectedCategoryId(category.id)}
                      theme="faq"
                    />
                  ))
                ) : (
                  <div className="flex w-full flex-col items-center justify-center gap-[1.375rem] pb-[13.9375rem]">
                    <div className="flex flex-col items-center gap-2 self-stretch">
                      <p className="body1-sb text-black">
                        아직 카테고리가 없어요
                      </p>
                      <p className="text-grey07 caption-m text-center">
                        자주 묻는 질문, 재고/수량, 이벤트, 진행 일정, 배송 일정,
                        <br />
                        후기 모음, 제작 과정 등의 카테고리를 추가해보세요.
                      </p>
                    </div>
                    <AddButton handleOnClick={() => {}}>
                      카테고리 추가하기
                    </AddButton>
                  </div>
                )}
              </article>
            </Suspense>
          </div>
        </article>

        {/* faq 카드 */}
        {faqCategories.length > 0 && (
          <div className="flex min-h-[calc(100vh-56px)] w-full flex-col justify-start gap-4">
            <Suspense fallback={<LoadingSpinner />}>
              {flattenedFaqCardList && flattenedFaqCardList.length > 0 && (
                <ItemDetailFaqCard
                  totalElements={
                    faqCardList?.pages[faqCardList.pages.length - 1]
                      ?.totalElements ?? 0
                  }
                  faqList={flattenedFaqCardList}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage}
                />
              )}
            </Suspense>
            <div className="mb-[12.1875rem] w-full flex-1 px-5">
              <AddButton
                handleOnClick={() => {
                  navigate(SELLER_ITEM_FAQ_REGISTER_PATH);
                }}
              >
                FAQ 추가하기
              </AddButton>
            </div>
          </div>
        )}
      </section>

      <BottomNavBar items={detailBottomNavItems} type="action" />
      {/* 톡박스 플로팅 버튼 */}
      <Suspense fallback={<LoadingSpinner />}>
        {itemDetailData && (
          <FloatingButton
            talkBoxOpenStatus={itemDetailData.talkBoxOpenStatus}
            showTooltip={showTooltip}
            itemId={Number(itemId)}
            handleTalkBoxButtonClick={handleTalkBoxButtonClick}
            unchecked={itemDetailData.unchecked}
          />
        )}
      </Suspense>

      {isBottomSheetOpen && (
        <VisibilityBottomSheet
          setIsOpen={setIsBottomSheetOpen}
          isOpen={isBottomSheetOpen}
        />
      )}
    </div>
  );
};

export default SellerItemDetailPage;
