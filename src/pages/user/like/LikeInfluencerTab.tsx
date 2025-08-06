import { LoadingSpinner, MyLikedInfluencerBox } from '@/components';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetLikedSellerList } from '@/services/likes/query/useGetLikedSellerList';
import { SellerLikeList } from '@/types/user/Like.types';
import { useRef } from 'react';

const LikeInfluencerTab = () => {
  const {
    data: likedSellerList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLikedSellerList({ size: 8 });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const sellerList = likedSellerList?.pages
    .flatMap((page) => page?.sellerLikeList ?? [])
    .filter(Boolean) as SellerLikeList[];

  return (
    <section className="scrollbar-hide bg-grey01 relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      {!isLoading && sellerList?.length > 0 ? (
        <ul className="flex w-full flex-1 flex-col gap-3">
          {sellerList?.map((influencer) => (
            <MyLikedInfluencerBox
              key={influencer.sellerId}
              influencer={influencer}
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
        </ul>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-grey09 body2-m">찜한 인플루언서가 아직 없어요</p>
        </div>
      )}
    </section>
  );
};

export default LikeInfluencerTab;
