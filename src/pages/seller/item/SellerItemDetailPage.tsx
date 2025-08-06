import { useState, useEffect, useRef, lazy, Suspense } from 'react';

import {
  PageHeader,
  BottomNavBar,
  CategoryChip,
  VisibilityBottomSheet,
  LoadingSpinner,
  ToolTip,
  // AddButton,
} from '@/components';

// icon
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import Link2Icon from '@/assets/icon/common/Link2Icon.svg?react';
import LockIcon from '@/assets/icon/common/LockIcon.svg?react';
import EditIcon from '@/assets/icon/common/EditIcon.svg?react';
import TalkBoxIcon from '@/assets/icon/common/TalkBoxIcon.svg?react';

// path
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { SELLER_ITEM_EDIT_PATH } from '@/utils/generatePath';

// type
import { BottomNavItem } from '@/components/common/BottomNavBar';
import { CategoryType } from '@/types/common/CategoryType.types';
import { TalkBoxOpenStatusType } from '@/types/common/ItemType.types';

// hooks & utils
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useCopyMarketUrl } from '@/utils/useCopyUrl';
import { useSnackbarStore } from '@/store/snackbarStore';

// api
import { useGetMarketItemDetailSuspense } from '@/services/sellerItem/query/useGetMarketItemDetail';
import { useGetItemFaqCategory } from '@/services/sellerFaqCard/query/useGetItemFaqCategory';
import { useGetFaqCardByCategory } from '@/services/sellerFaqCard/query/useGetFaqCardByCategory';
import cn from '@/utils/cn';

const ItemDetailFaqCard = lazy(
  () => import('@/components/common/item/itemDetail/ItemDetailFaqCard')
);

const ItemDetailInfo = lazy(
  () => import('@/components/common/item/itemDetail/ItemDetailInfo')
);

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
  const [showTooltip, setShowTooltip] = useState(false);

  const categoryAnchorRef = useRef<HTMLDivElement>(null);
  const itemDetailRef = useRef<HTMLDivElement>(null);

  const copyUrl = useCopyMarketUrl(sellerId);

  const { data: itemDetailData, isPending: isItemDetailPending } =
    useGetMarketItemDetailSuspense({
      sellerId: Number(sellerId),
      itemId: Number(itemId),
    });

  useEffect(() => {
    if (isItemDetailPending) return;

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
  }, [isDetailOnScreen, isItemDetailPending]);

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
  const { data: faqCategories } = useGetItemFaqCategory({
    sellerId: Number(sellerId),
    itemId: Number(itemId),
  });

  useEffect(() => {
    if (faqCategories && faqCategories.length > 0)
      setSelectedCategoryId(faqCategories[0].id);
  }, [faqCategories]);

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

  const handleTalkBoxClick = ({
    itemId,
    talkBoxOpenStatus,
  }: {
    itemId: string;
    talkBoxOpenStatus?: TalkBoxOpenStatusType;
  }) => {
    if (talkBoxOpenStatus === 'OPENED') {
      navigate(
        generatePath(
          `${PATH.SELLER.BASE}/${PATH.SELLER.TALK_BOX.BASE}/${PATH.SELLER.TALK_BOX.ITEM.BASE}`,
          { itemId: String(itemId) }
        )
      );
      return;
    }
    if (talkBoxOpenStatus === 'INITIAL') {
      navigate(
        generatePath(
          `${PATH.SELLER.BASE}/${PATH.SELLER.TALK_BOX.BASE}/${PATH.SELLER.TALK_BOX.ONBOARDING.BASE}`,
          { itemId: String(itemId) }
        )
      );
      return;
    }
    if (talkBoxOpenStatus === 'CLOSED') {
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
    <>
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
          <h2 className="text-grey11 body1-b px-5">FAQ</h2>
          <div className="relative px-5">
            {/* ref */}
            <div
              ref={categoryAnchorRef}
              className="absolute bottom-0 left-0 z-19 h-[1px] w-60"
            />

            <article className="flex w-full flex-wrap gap-2">
              <Suspense fallback={<LoadingSpinner />}>
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
              </Suspense>
            </article>
          </div>
        </article>
        <Suspense fallback={<LoadingSpinner />}>
          {flattenedFaqCardList && (
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
      </section>

      {/* 톡박스 플로팅 버튼 */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="pointer-events-none sticky bottom-20 z-[1] flex w-full flex-col items-end gap-1.5 pr-5">
          <ToolTip
            text={
              itemDetailData?.talkBoxOpenStatus === 'OPENED'
                ? '이 제품의 질문에 답변해 주세요.'
                : '이 상품의 톡박스를 활성화해보세요.'
            }
            position="right"
            additionalStyles={cn(
              'pointer-events-none transition-opacity duration-500',
              showTooltip ? 'opacity-100' : 'opacity-0'
            )}
          />

          {itemId && (
            <button
              type="button"
              onClick={() => {
                handleTalkBoxClick({
                  itemId: String(itemId),
                  talkBoxOpenStatus: itemDetailData?.talkBoxOpenStatus,
                });
              }}
              className={cn(
                'pointer-events-auto flex aspect-[1/1] h-11 w-11 cursor-pointer flex-col items-center justify-center rounded-full bg-black shadow-[0_.25rem_1.125rem_0_rgba(0,0,0,0.25)]',
                itemDetailData?.talkBoxOpenStatus === 'OPENED'
                  ? 'bg-black'
                  : 'bg-grey08'
              )}
            >
              <TalkBoxIcon className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </Suspense>

      <BottomNavBar items={detailBottomNavItems} type="action" />
      {isBottomSheetOpen && (
        <VisibilityBottomSheet
          setIsOpen={setIsBottomSheetOpen}
          isOpen={isBottomSheetOpen}
        />
      )}
    </>
  );
};

export default SellerItemDetailPage;
