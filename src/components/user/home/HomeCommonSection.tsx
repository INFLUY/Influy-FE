import {
  HomeSectionTitle,
  ItemAlbumCard,
  HorizontalRankingCard,
  CategoryChip,
} from '@/components';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { ItemCardType } from '@/types/common/ItemType.types';
import { ITEM_DETAIL } from '@/utils/generatePath';
import { CategoryType } from '@/types/common/CategoryType.types';

const HomeCommonSection = ({
  expiringItem,
  trendingItem,
  recommendedItem,
  categoryList,
  selectedCategory,
  setSelectedCategory,
}: {
  expiringItem: ItemCardType[] | [];
  trendingItem: ItemCardType[] | [];
  recommendedItem: ItemCardType[] | [];
  categoryList: CategoryType[] | [];
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 mb-[6.375rem] flex flex-col gap-11">
      {/* 마감임박 */}
      <article className="flex flex-col gap-4">
        <HomeSectionTitle
          title="마감 임박"
          itemLength={expiringItem.length}
          onClickMore={() => {
            navigate(PATH.HOME.MORE.ENDING_SOON);
          }}
        />
        {expiringItem.length > 0 ? (
          <div className="grid grid-cols-2 grid-rows-2 gap-x-[.1875rem] gap-y-8">
            {expiringItem.map((item) => (
              <ItemAlbumCard
                key={item.itemId}
                item={item}
                onCardClick={() => {
                  navigate(
                    generatePath(ITEM_DETAIL, {
                      marketId: item.sellerId,
                      itemId: item.itemId,
                    })
                  );
                }}
              />
            ))}
          </div>
        ) : (
          <div className="body1-sb flex h-[21.5rem] w-full items-center justify-center">
            아직 등록된 상품이 없어요
          </div>
        )}
      </article>

      {/* 인기 급상승 */}
      <section className="flex flex-col gap-2.5">
        <HomeSectionTitle title="인기 급상승" />
        {trendingItem.length > 0 ? (
          <div className="flex w-full flex-col gap-3 px-5">
            {trendingItem.slice(0, 3).map((item, i) => (
              <HorizontalRankingCard
                key={item.itemId}
                item={item}
                ranking={i + 1}
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
        ) : (
          <div className="body1-sb flex h-[21.5rem] w-full items-center justify-center">
            아직 등록된 상품이 없어요
          </div>
        )}
      </section>

      {/* 카테고리별 추천 */}
      <section className="flex flex-col gap-4">
        <HomeSectionTitle
          title="카테고리별 추천"
          itemLength={recommendedItem.length}
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
                text={category.name}
                isSelected={selectedCategory === category.id}
                onToggle={() => setSelectedCategory(category.id)}
                theme="home"
              />
            ))}
        </div>
        {recommendedItem.length > 0 ? (
          <div className="grid grid-cols-2 grid-rows-2 gap-x-[.1875rem] gap-y-8">
            {recommendedItem.map((item) => (
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
        ) : (
          <div className="body1-sb flex h-[21.5rem] w-full items-center justify-center">
            아직 등록된 상품이 없어요
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeCommonSection;
