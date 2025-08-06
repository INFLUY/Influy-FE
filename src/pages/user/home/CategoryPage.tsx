import {
  PageHeader,
  ItemAlbumCard,
  CategoryChip,
  NotificationButton,
  BackButton,
  ItemAlbumCardSkeleton,
} from '@/components';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ITEM_DETAIL } from '@/utils/generatePath';
import { CategoryType } from '@/types/common/CategoryType.types';
import { useGetItemCategory } from '@/services/itemCategory/useGetItemCategory';
import { useGetRecommendedItem } from '@/services/home/query/useGetRecommendedItem';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ItemCardType } from '@/types/common/ItemType.types';
import NotFound from '@/pages/error/NotFound';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<number>(
    categoryId ? Number(categoryId) : 0
  );

  const categoryRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 선택된 카테고리로 스크롤 이동
  useEffect(() => {
    const selectedRef = categoryRefs.current.get(selectedCategory);
    const container = scrollContainerRef.current;

    if (selectedRef && container) {
      const offsetLeft = selectedRef.offsetLeft;
      const scrollAdjustment = offsetLeft - 20;

      container.scrollTo({
        left: scrollAdjustment,
        behavior: 'smooth',
      });
    }
  }, [selectedCategory]);

  const { data: itemCategories, isLoading: isCategoryLoading } =
    useGetItemCategory();
  const allCategoryDto = {
    id: 0,
    name: '전체',
  };
  const navigate = useNavigate();

  const isValidCategory =
    Number(categoryId) === 0 ||
    itemCategories?.categoryDtoList?.some(
      (cat) => cat.id === Number(categoryId)
    );

  const {
    data: recommendItems,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetRecommendedItem({
    categoryId: selectedCategory === 0 ? null : selectedCategory,
    size: 8,
    enabled: !isCategoryLoading && isValidCategory,
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

  if (!isCategoryLoading && !isValidCategory) {
    return <NotFound />;
  }

  return (
    <section className="bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto pt-11">
      <PageHeader
        leftIcons={[<BackButton />]}
        rightIcons={[
          <SearchIcon className="h-6 w-6 cursor-pointer" />,
          <NotificationButton />,
        ]}
        additionalStyles="bg-white border-0 "
      >
        카테고리별 추천
      </PageHeader>
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide mt-3 flex w-full shrink-0 flex-nowrap items-center gap-2 overflow-x-scroll px-5 py-2"
      >
        {[allCategoryDto, ...(itemCategories?.categoryDtoList || [])].map(
          (category: CategoryType) => (
            <div
              key={category.id}
              ref={(el) => void categoryRefs.current.set(category.id, el)}
              className="flex w-fit shrink-0 flex-nowrap items-center"
            >
              <CategoryChip
                text={category.name}
                isSelected={selectedCategory === category.id}
                onToggle={() => {
                  setSelectedCategory(category.id);
                  navigate(`../${category.id}`, { replace: true });
                }}
                theme="home"
              />
            </div>
          )
        )}
      </div>
      {isLoading && (
        <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ItemAlbumCardSkeleton key={idx} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
        {!isLoading &&
          itemList?.map((item: ItemCardType) => (
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

export default CategoryPage;
