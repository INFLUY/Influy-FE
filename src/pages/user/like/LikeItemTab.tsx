import { ItemAlbumCard } from '@/components';
import { ItemCardType } from '@/types/common/ItemType.types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DEATIL } from '@/utils/generatePath';
const itemMockData: ItemCardType[] = [
  {
    sellerProfileImg: '/profile.png',
    sellerUsername: 'daisylooks',
    sellerNickname: '데이지룩즈',
    sellerId: 10,
    itemId: 77,
    itemMainImg: '/img1.png',
    itemPeriod: 1,
    itemName: '[7차] 제목제목',
    startDate: '2025-07-05T00:00:00.000Z',
    endDate: '2025-07-12T00:00:00.000Z',
    tagline: null,
    currentStatus: 'DEFAULT',
    liked: false,
  },
];

const EndingSoonPage = () => {
  const navigate = useNavigate();
  return (
    <section className="scrollbar-hide relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
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

export default EndingSoonPage;
