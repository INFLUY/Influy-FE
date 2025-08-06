import { ItemAlbumCard, Loading, LoadingSpinner } from '@/components';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DETAIL } from '@/utils/generatePath';
import { useGetLikedItemList } from '@/services/likes/query/useGetLikedItemList';
import { Suspense, useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ItemCardType } from '@/types/common/ItemType.types';

const LikeItemTab = () => {
  const navigate = useNavigate();

  const {
    data: likedItemList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLikedItemList({ size: 8 });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const itemList = likedItemList?.pages
    .flatMap((page) => page?.itemLikeList ?? [])
    .filter(Boolean) as ItemCardType[];

  return (
    <section className="scrollbar-hide bg-grey01 relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <Suspense fallback={<Loading />}>
        {itemList && itemList?.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
            {itemList.map((item) => (
              <ItemAlbumCard
                key={item.itemId}
                item={item}
                onCardClick={() =>
                  navigate(
                    generatePath(ITEM_DETAIL, {
                      marketId: item.sellerId,
                      itemId: item.itemId,
                    })
                  )
                }
              />
            ))}

            {hasNextPage && (
              <div ref={observerRef} className="h-4 w-full">
                {isFetchingNextPage && (
                  <div className="flex justify-center">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-grey09 body2-m">찜한 상품이 아직 없어요</p>
          </div>
        )}
      </Suspense>
    </section>
  );
};

export default LikeItemTab;
