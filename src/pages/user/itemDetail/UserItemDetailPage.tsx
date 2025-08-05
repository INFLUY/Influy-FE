import { useState, useEffect, useRef, lazy, Suspense } from 'react';

import { PageHeader, CategoryChip, LoadingSpinner } from '@/components';
import { UserNav } from '@/components/user/itemDetail/UserNav';
// icon
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';

// path
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';

// type
import { CategoryType } from '@/types/common/CategoryType.types';

// hooks
import { useScrollToTop } from '@/hooks/useScrollToTop';

// api
import { useGetMarketItemDetailSuspense } from '@/services/sellerItem/query/useGetMarketItemDetail';
import { useGetItemLikeCounts } from '@/services/likes/query/useGetItemLikeCounts';
import { useGetItemFaqCategory } from '@/services/sellerFaqCard/query/useGetItemFaqCategory';
import { useGetFaqCardByCategory } from '@/services/sellerFaqCard/query/useGetFaqCardByCategory';
const ItemDetailFaqCard = lazy(
  () => import('@/components/common/item/itemDetail/ItemDetailFaqCard')
);

const ItemDetailInfo = lazy(
  () => import('@/components/common/item/itemDetail/ItemDetailInfo')
);

const UserItemDetailPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const { itemId, marketId } = useParams();

  const [isFaqCategoryTop, setIsFaqCategoryTop] = useState(false);
  const [isDetailOnScreen, setIsDetailOnScreen] = useState(true);
  const categoryAnchorRef = useRef<HTMLDivElement>(null);
  const itemDetailRef = useRef<HTMLDivElement>(null);

  const { data: itemDetailData, isPending: isItemDetailPending } =
    useGetMarketItemDetailSuspense({
      sellerId: Number(marketId),
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

  const scrollViewRef = useScrollToTop(); // 기본: 상단 스크롤

  // -- API
  // 좋아요수
  const { data: itemLikeCount } = useGetItemLikeCounts({
    itemId: Number(itemId),
    sellerId: Number(marketId),
  });

  const onTalkBoxClick = () => {
    navigate(`${PATH.MARKET.DETAIL.ITEM.TALK_BOX}`);
  };
  const onBuyClick = () => {};

  const { data: faqCategories } = useGetItemFaqCategory({
    sellerId: Number(marketId),
    itemId: Number(itemId),
  });

  useEffect(() => {
    setSelectedCategoryId(faqCategories[0].id);
  }, [faqCategories]);

  const {
    data: faqCardList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFaqCardByCategory({
    sellerId: Number(marketId),
    itemId: Number(itemId),
    faqCategoryId: selectedCategoryId,
  });
  console.log(faqCardList);

  const flattenedFaqCardList = faqCardList?.pages.flatMap(
    (page) => page?.faqCardList ?? []
  );

  // TODO: 카테고리 바뀌어도 스크롤바 위치 안 바뀌게 하기

  return (
    <>
      {/* 헤더 */}
      {isFaqCategoryTop ? (
        <header className="sticky top-0 z-20 flex w-full flex-nowrap gap-2 bg-[rgba(241,241,241,0.30)]">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-scroll px-5 pt-2 pb-[.4375rem]">
            {faqCategories.map((category: CategoryType) => (
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
              <ShareIcon className="h-6 w-6 cursor-pointer text-black" />,
            ]}
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
            sellerId={Number(marketId)}
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
            {isFaqCategoryTop && (
              <div className="absolute top-0 z-1 h-full w-full bg-white" />
            )}
          </div>
        </article>
        {flattenedFaqCardList && (
          <ItemDetailFaqCard
            totalElements={
              faqCardList?.pages[faqCardList.pages.length - 1]?.totalElements ??
              0
            }
            faqList={flattenedFaqCardList}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </section>
      <UserNav
        likeCount={itemLikeCount?.likeCnt ?? 0}
        onTalkBoxClick={onTalkBoxClick}
        marketLink={itemDetailData?.marketLink}
        sellerId={Number(marketId)}
        itemId={Number(itemId)}
        liked={false} //수정
        isTalkBoxOpened={itemDetailData?.talkBoxOpenStatus === 'OPENED'}
      />
    </>
  );
};

export default UserItemDetailPage;
