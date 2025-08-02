import {
  PageHeader,
  ItemAlbumCard,
  CategoryChip,
  LoadingSpinner,
} from '@/components';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ITEM_DEATIL } from '@/utils/generatePath';
import { CategoryType } from '@/types/common/CategoryType.types';
import { useGetItemCategory } from '@/services/itemCategory/useGetItemCategory';
import { useGetRecommendedItem } from '@/services/home/query/useGetRecommendedItem';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ItemCardType } from '@/types/common/ItemType.types';

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { data: itemCategories } = useGetItemCategory();
  const allCateogryDto = {
    id: 0,
    name: '전체',
  };
  const navigate = useNavigate();

  const {
    data: recommendItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetRecommendedItem({
    categoryId: selectedCategory === 0 ? null : selectedCategory,
    size: 8,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const itemList = recommendItems?.pages
    .flatMap((page) => page?.itemPreviewList ?? [])
    .filter(Boolean) as ItemCardType[];

  return (
    <section className="bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto pt-11">
      <PageHeader
        leftIcons={[
          <ArrowLeftIcon
            onClick={() => navigate(-1)}
            className="h-6 w-6 cursor-pointer"
          />,
        ]}
        rightIcons={[
          <SearchIcon className="h-6 w-6 cursor-pointer" />,
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
          </button>,
        ]}
        additionalStyles="bg-white border-0 "
      >
        카테고리별 추천
      </PageHeader>
      <div className="scrollbar-hide mt-3 flex w-full shrink-0 flex-nowrap items-center gap-2 overflow-x-scroll px-5 py-2">
        {[allCateogryDto, ...(itemCategories?.categoryDtoList || [])].map(
          (category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.name}
              isSelected={selectedCategory === category.id}
              onToggle={() => setSelectedCategory(category.id)}
              theme="home"
            />
          )
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
        {itemList?.map((item: ItemCardType) => (
          <ItemAlbumCard
            key={item.itemId}
            item={item}
            onCardClick={() =>
              navigate(
                generatePath(ITEM_DEATIL, {
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

export default CategoryPage;
