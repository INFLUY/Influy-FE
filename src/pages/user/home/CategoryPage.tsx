import { PageHeader, ItemAlbumCard, CategoryChip } from '@/components';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import { ItemCardType } from '@/types/common/ItemType.types';
import { generatePath, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ITEM_DEATIL } from '@/utils/generatePath';
import { CategoryType } from '@/types/common/CategoryType.types';
import { useGetItemCategory } from '@/services/itemCategory/useGetItemCategory';
const itemMockData: ItemCardType[] = [
  {
    sellerProfileImg: '/profile.png',
    sellerUsername: 'user_one',
    sellerNickname: '유저원',
    sellerId: 1,
    itemId: 101,
    itemMainImg: '/product.png',
    itemPeriod: 7,
    itemName: '빈티지 가죽 가방',
    startDate: '2025-07-25T00:00:00.000Z',
    endDate: '2025-08-01T00:00:00.000Z',
    tagline: '한정 수량! 놓치지 마세요',
    currentStatus: 'DEFAULT',
    liked: true,
  },
  {
    sellerProfileImg: null,
    sellerUsername: 'seller_kim',
    sellerNickname: '김셀러',
    sellerId: 2,
    itemId: 102,
    itemMainImg: '/product.png',
    itemPeriod: 14,
    itemName: '모던 아트 포스터',
    startDate: '2025-07-25T00:00:00.000Z',
    endDate: '2025-08-01T00:00:00.000Z',
    tagline: null,
    currentStatus: 'EXTEND',
    liked: false,
  },
  {
    sellerProfileImg: '/profile3.png',
    sellerUsername: 'artlover33',
    sellerNickname: '아트러버',
    sellerId: 3,
    itemId: 103,
    itemMainImg: '/product.png',
    itemPeriod: 5,
    itemName: '수제 도자기 컵 세트',
    startDate: '2025-07-25T00:00:00.000Z',
    endDate: '2025-08-01T00:00:00.000Z',
    tagline: '따뜻한 감성을 담은 작품',
    currentStatus: 'SOLD_OUT',
    liked: true,
  },
];
const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const itemCategories = useGetItemCategory();
  const navigate = useNavigate();

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
        {itemCategories?.categoryDtoList &&
          itemCategories?.categoryDtoList.length > 0 &&
          itemCategories?.categoryDtoList.map((category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.name}
              isSelected={selectedCategory === category.id}
              onToggle={() => setSelectedCategory(category.id)}
              theme="home"
            />
          ))}
      </div>
      <div className="grid grid-cols-2 gap-x-[.1875rem] gap-y-8">
        {itemMockData.map((item) => (
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
      </div>
    </section>
  );
};

export default CategoryPage;
