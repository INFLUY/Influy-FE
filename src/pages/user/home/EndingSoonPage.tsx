import { PageHeader, ItemAlbumCard, LoadingSpinner } from '@/components';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DETAIL } from '@/utils/generatePath';
import { useGetCloseDeadlineItem } from '@/services/home/query/useGetCloseDeadlineItem';
import { ItemCardType } from '@/types/common/ItemType.types';
import { useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const EndingSoonPage = () => {
  const navigate = useNavigate();

  const {
    data: expiringItems,
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

  return (
    <section className="bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto pt-11">
      <PageHeader
        leftIcons={[
          <ArrowLeftIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />,
        ]}
        rightIcons={[
          <SearchIcon className="h-6 w-6 cursor-pointer" />,
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
          </button>,
        ]}
        additionalStyles="bg-white border-0"
      >
        마감임박
      </PageHeader>
      <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
        {itemList?.map((item) => (
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
    </section>
  );
};

export default EndingSoonPage;
