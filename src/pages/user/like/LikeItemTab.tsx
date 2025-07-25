import { ItemAlbumCard } from '@/components';
import { ItemCardType } from '@/types/common/ItemType.types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DEATIL } from '@/utils/generatePath';
const itemMockData: ItemCardType[] = [
  {
    itemId: 101,
    itemPeriod: 7,
    itemName: '[7차] 제목제목',
    startDate: '2025-07-05T00:00:00.000Z',
    endDate: '2025-07-12T00:00:00.000Z',
    tagline: null,
    currentStatus: 'DEFAULT',
    sellerName: 'daisylooks',
    sellerId: 1,
    mainImg: '/img1.png',
    isScrapped: true,
  },
  {
    itemId: 102,
    itemPeriod: 5,
    itemName: '[NEW] 오버핏 크롭 반팔티_white',
    startDate: '2025-07-06T00:00:00.000Z',
    endDate: '2025-07-11T00:00:00.000Z',
    tagline: '여름엔 역시 오버핏 반팔티! 심플하지만 어디에나 잘 어울려요.',
    currentStatus: 'DEFAULT',
    sellerName: 'minwhite',
    mainImg: '/img1.png',
    sellerId: 5,
    isScrapped: false,
  },
  {
    itemId: 103,
    itemPeriod: null,
    itemName:
      '세미 와이드 데님팬츠_vintage blue 오늘 단 하루만 이 가격에 너무 좋아요 짱입니다',
    startDate: null,
    endDate: null,
    tagline: '기본에 충실한 핏. 계절 상관없이 활용도 높은 데일리 데님입니다.',
    currentStatus: 'EXTEND',
    sellerName: 'jeanlab',
    sellerId: 3,
    mainImg: '/img1.png',
    isScrapped: true,
  },
  {
    itemId: 104,
    itemPeriod: 3,
    itemName: '포켓 셋업 숏자켓_charcoal grey',
    startDate: '2025-07-09T00:00:00.000Z',
    endDate: '2025-07-12T00:00:00.000Z',
    tagline: '트렌디한 실루엣과 실용적인 포켓 디테일로 다양한 무드 연출 가능.',
    currentStatus: 'SOLD_OUT',
    sellerName: 'outermint',
    sellerId: 9,
    mainImg: '/img1.png',
    isScrapped: false,
  },
  {
    itemId: 106,
    itemPeriod: 7,
    itemName: '[7차] 제목제목',
    startDate: '2025-07-05T00:00:00.000Z',
    endDate: '2025-07-12T00:00:00.000Z',
    tagline: null,
    currentStatus: 'DEFAULT',
    sellerName: 'daisylooks',
    sellerId: 1,
    mainImg: '/img1.png',
    isScrapped: true,
  },
  {
    itemId: 107,
    itemPeriod: 5,
    itemName: '[NEW] 오버핏 크롭 반팔티_white',
    startDate: '2025-07-06T00:00:00.000Z',
    endDate: '2025-07-11T00:00:00.000Z',
    tagline: '여름엔 역시 오버핏 반팔티! 심플하지만 어디에나 잘 어울려요.',
    currentStatus: 'DEFAULT',
    sellerName: 'minwhite',
    mainImg: '/img1.png',
    sellerId: 5,
    isScrapped: false,
  },
  {
    itemId: 108,
    itemPeriod: null,
    itemName:
      '세미 와이드 데님팬츠_vintage blue 오늘 단 하루만 이 가격에 너무 좋아요 짱입니다',
    startDate: null,
    endDate: null,
    tagline: '기본에 충실한 핏. 계절 상관없이 활용도 높은 데일리 데님입니다.',
    currentStatus: 'EXTEND',
    sellerName: 'jeanlab',
    sellerId: 3,
    mainImg: '/img1.png',
    isScrapped: true,
  },
  {
    itemId: 109,
    itemPeriod: 3,
    itemName: '포켓 셋업 숏자켓_charcoal grey',
    startDate: '2025-07-09T00:00:00.000Z',
    endDate: '2025-07-12T00:00:00.000Z',
    tagline: '트렌디한 실루엣과 실용적인 포켓 디테일로 다양한 무드 연출 가능.',
    currentStatus: 'SOLD_OUT',
    sellerName: 'outermint',
    sellerId: 9,
    mainImg: '/img1.png',
    isScrapped: false,
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
