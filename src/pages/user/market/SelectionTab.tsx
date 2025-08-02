import { ItemGridCard } from '@/components/user/common/ItemGridCard';
import { useRef, useState } from 'react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { ItemPreviewList } from '@/types/common/ItemType.types';
import { useGetMarketItems } from '@/services/sellerItem/query/useGetMarketItems';
import { useOutletContext } from 'react-router-dom';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { LoadingSpinner } from '@/components';

const SelectionTab = () => {
  const { marketId } = useOutletContext<{ marketId: number }>();
  const [inProgress, setInProgress] = useState<boolean>(false); // 진행 중인 상품만 보기

  const {
    data: marketItemList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMarketItems({
    sellerId: marketId,
    archive: false,
    onGoing: inProgress,
    size: 8,
  });

  const itemList = marketItemList?.pages
    .flatMap((page) => page?.itemPreviewList ?? [])
    .filter(Boolean) as ItemPreviewList[];

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
  };

  return (
    <section className="flex w-full flex-col gap-4 pt-5 pb-36">
      <span className="flex w-full justify-start px-5">
        <span className="flex cursor-pointer items-center gap-[.375rem]">
          <input
            type="checkbox"
            id="filterItemInProgress"
            hidden
            checked={inProgress}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="filterItemInProgress"
            className="text-grey08 caption-m flex cursor-pointer items-center justify-center gap-[.375rem] text-center align-middle"
          >
            {inProgress ? <CheckBoxOn /> : <CheckBoxOff />}
            <span>진행 중인 상품만 보기</span>
          </label>
        </span>
      </span>
      {itemList && itemList?.length !== 0 ? (
        <ul className="grid grid-cols-2 content-start items-start gap-x-[.1875rem] gap-y-8">
          {itemList?.map((item) => (
            <ItemGridCard key={item?.itemId} item={item} />
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
        <span className="text-grey06 body-2-m flex w-full justify-center pt-[5.8125rem]">
          아직 등록된 상품이 없습니다.
        </span>
      )}
    </section>
  );
};

export default SelectionTab;
