import ItemAlbumCard from '@/components/common/card/ItemAlbumCard';
import ItemAlbumCardSkeleton from '@/components/common/card/ItemAlbumCardSkeleton';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ItemCardType } from '@/types/common/ItemType.types';
import { ITEM_DETAIL } from '@/utils/generatePath';
import { useRef } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';

const ItemResult = ({
  total,
  isLoading,
  itemList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  total: number;
  isLoading: boolean;
  itemList: ItemCardType[] | [];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) => {
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <article className="flex flex-1 flex-col gap-3 py-3">
      {isLoading && (
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-grey04 mx-5 h-5 w-8 animate-pulse" />
          <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ItemAlbumCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      )}
      {!isLoading && <div className="body2-m text-grey10 px-5">{total}개</div>}
      {!isLoading &&
        (itemList?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
              {itemList.map((item: ItemCardType) => (
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
                className="mt-8 grid grid-cols-2 gap-x-[.1875rem] gap-y-8"
                ref={observerRef}
              >
                {isFetchingNextPage &&
                  Array.from({ length: 8 }).map((_, idx) => (
                    <ItemAlbumCardSkeleton key={idx} />
                  ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-[1.125rem] text-center">
            <SearchIcon className="text-grey05 h-20 w-20" />
            <p className="text-grey09 body2-m">검색된 상품 내역이 없어요</p>
          </div>
        ))}
    </article>
  );
};

export default ItemResult;
