import {
  HomeSectionTitle,
  ItemAlbumCard,
  HorizontalRankingCard,
  CategoryChip,
} from '@/components';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';

import { CategoryType } from '@/types/common/CategoryType.types';
import { ItemCardType } from '@/types/common/ItemType.types';

const HomeCommonSection = ({
  expiringItem,
  trendingItem,
  recommendedItem,
  categoryList,
  selectedCategory,
  setSelectedCategory,
}: {
  expiringItem: ItemCardType[];
  trendingItem: ItemCardType[];
  recommendedItem: ItemCardType[];
  categoryList: CategoryType[];
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 mb-[6.375rem] flex flex-col gap-11">
      {/* 마감임박 */}
      <section className="flex flex-col gap-4">
        <HomeSectionTitle
          title="마감 임박"
          onClickMore={() => {
            navigate(PATH.HOME.MORE.ENDING_SOON);
          }}
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-x-[.1875rem] gap-y-8">
          {expiringItem.map((item) => (
            <ItemAlbumCard
              key={item.itemId}
              item={item}
              onCardClick={() => {}}
            />
          ))}
        </div>
      </section>

      {/* 인기 급상승 */}
      <section className="flex flex-col gap-2.5">
        <HomeSectionTitle title="인기 급상승" />
        <div className="flex w-full flex-col gap-3 px-5">
          {trendingItem.slice(0, 3).map((item, i) => (
            <HorizontalRankingCard
              key={item.itemId}
              item={item}
              ranking={i + 1}
              onCardClick={() => {}}
            />
          ))}
        </div>
      </section>

      {/* 카테고리별 추천 */}
      <section className="flex flex-col gap-4">
        <HomeSectionTitle
          title="카테고리별 추천"
          onClickMore={() => {
            navigate(PATH.HOME.MORE.CATEGORY);
          }}
        />
        <div className="scrollbar-hide flex w-full flex-nowrap items-center gap-2 overflow-x-scroll px-5">
          {categoryList &&
            categoryList.length > 0 &&
            categoryList.map((category: CategoryType) => (
              <CategoryChip
                key={category.id}
                text={category.category}
                isSelected={selectedCategory == category.id}
                onToggle={() => setSelectedCategory(category.id)}
                theme="home"
              />
            ))}
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-[.1875rem] gap-y-8">
          {recommendedItem.map((item) => (
            <ItemAlbumCard
              key={item.itemId}
              item={item}
              onCardClick={() => {}}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeCommonSection;
