import {
  PageHeader,
  ItemAlbumCard,
  NotificationButton,
  BackButton,
  ItemAlbumCardSkeleton,
  SearchButton,
} from '@/components';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DETAIL } from '@/utils/generatePath';
import { useGetCloseDeadlineItem } from '@/services/home/query/useGetCloseDeadlineItem';
import { ItemCardType } from '@/types/common/ItemType.types';
import { useEffect, useRef, useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useAuthStore } from '@/store/authStore';

const EndingSoonPage = () => {
  const { reissue } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {
    data: expiringItems,
    isLoading: isItemLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCloseDeadlineItem({ size: 8 });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const itemList = expiringItems?.pages
    .flatMap((page) => page?.itemPreviewList ?? [])
    .filter(Boolean) as ItemCardType[];

  useEffect(() => {
    const checkToken = async () => {
      await reissue();
      setIsLoading(false);
    };
    checkToken();
  }, [reissue]);

  return (
    <section className="bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto pt-11">
      <PageHeader
        leftIcons={[<BackButton />]}
        rightIcons={[<SearchButton />, <NotificationButton />]}
        additionalStyles="bg-white border-0"
      >
        마감임박
      </PageHeader>
      <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
        {(isItemLoading || isLoading) &&
          Array.from({ length: 8 }).map((_, idx) => (
            <ItemAlbumCardSkeleton key={idx} />
          ))}
        {!isItemLoading &&
          !isLoading &&
          itemList &&
          itemList?.map((item) => (
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
      </div>
      {hasNextPage && (
        <div
          className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8"
          ref={observerRef}
        >
          {isFetchingNextPage &&
            Array.from({ length: 8 }).map((_, idx) => (
              <ItemAlbumCardSkeleton key={idx} />
            ))}
        </div>
      )}
    </section>
  );
};

export default EndingSoonPage;
