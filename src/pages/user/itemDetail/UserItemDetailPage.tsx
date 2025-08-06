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

// hooks & utils
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useCopyMarketUrl } from '@/utils/useCopyUrl';
import cn from '@/utils/cn';
// api
import { useGetMarketItemDetailSuspense } from '@/services/sellerItem/query/useGetMarketItemDetail';
import { useGetItemLikeCounts } from '@/services/likes/query/useGetItemLikeCounts';
import { useGetItemFaqCategory } from '@/services/sellerFaqCard/query/useGetItemFaqCategory';
import { useGetFaqCardByCategory } from '@/services/sellerFaqCard/query/useGetFaqCardByCategory';
const ItemDetailFaqCard = lazy(
  () => import('@/components/common/item/itemDetail/ItemDetailFaqCard')
);

import ItemDetailInfo from '@/components/common/item/itemDetail/ItemDetailInfo';
const FaqCategorySection = lazy(
  () => import('@/components/common/item/itemDetail/FaqCategorySection')
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

  const copyUrl = useCopyMarketUrl(Number(marketId));

  const { data: itemDetailData, isPending: isItemDetailPending } =
    useGetMarketItemDetailSuspense({
      sellerId: Number(marketId),
      itemId: Number(itemId),
    });

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

  const { data: faqCategories, isPending: isFaqCategoryPending } =
    useGetItemFaqCategory({
      sellerId: Number(marketId),
      itemId: Number(itemId),
    });

  useEffect(() => {
    if (faqCategories && faqCategories.length > 0)
      setSelectedCategoryId(faqCategories[0].id);
  }, [faqCategories]);

  useEffect(() => {
    if (isItemDetailPending || isFaqCategoryPending || !itemDetailData) return;

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
  }, [
    isDetailOnScreen,
    isItemDetailPending,
    isFaqCategoryPending,
    itemDetailData,
  ]);

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

  const flattenedFaqCardList = faqCardList?.pages.flatMap(
    (page) => page?.faqCardList ?? []
  );

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
      {faqCategories && faqCategories.length > 0 && (
        <section className="mt-8 flex w-full flex-col gap-4">
          <article className="flex flex-col gap-[1.125rem]">
            <h2 className="text-grey11 body1-b px-5">FAQ</h2>
          </article>
          <Suspense fallback={<LoadingSpinner />}>
            <FaqCategorySection
              faqCategories={faqCategories}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              isFaqCategoryTop={isFaqCategoryTop}
              itemDetailRef={itemDetailRef}
              categoryAnchorRef={categoryAnchorRef}
            />
          </Suspense>
          {/* faq 카드 */}
          <div
            className={cn(
              'flex min-h-screen w-full flex-col gap-4',
              flattenedFaqCardList &&
                flattenedFaqCardList.length > 0 &&
                'bg-grey01'
            )}
          >
            <Suspense fallback={<LoadingSpinner />}>
              {flattenedFaqCardList && flattenedFaqCardList.length > 0 ? (
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
              ) : (
                <div className="flex w-full justify-center pt-15">
                  <p className="body2-m text-grey09 text-center">
                    아직 해당 카테고리에
                    <br />
                    FAQ가 등록되지 않았어요.
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </section>
      )}
      <UserNav
        likeCount={itemLikeCount?.likeCnt ?? 0}
        onTalkBoxClick={onTalkBoxClick}
        marketLink={itemDetailData?.marketLink}
        sellerId={Number(marketId)}
        itemId={Number(itemId)}
        liked={itemDetailData?.liked ?? false} //수정
        isTalkBoxOpened={itemDetailData?.talkBoxOpenStatus === 'OPENED'}
      />
    </>
  );
};

export default UserItemDetailPage;
