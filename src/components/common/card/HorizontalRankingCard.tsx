//홈 아카이빙 인기 급상승 카드
import { ItemCardType } from '@/types/common/ItemType.types';
import { ScrapButton, TimeChip } from '@/components';

const HorizontalRankingCard = ({
  item,
  onCardClick,
  ranking,
}: {
  item: ItemCardType;
  onCardClick: () => void;
  ranking: number;
}) => {
  return (
    <article className="flex w-full flex-col items-start justify-start gap-2">
      <p className="text-main subhead-sb">{ranking}</p>
      <div className="flex h-[6.75rem] w-full gap-2" onClick={onCardClick}>
        <div className="bg-grey03 relative h-[6.75rem] w-[6.75rem] rounded-[.0625rem]">
          {item.itemMainImg && (
            <img
              className="h-[6.75rem] w-[6.75rem] rounded-[.0625rem] object-cover"
              src={item.itemMainImg}
              alt={item.itemName + ' 썸네일'}
            />
          )}
          <ScrapButton
            scrapped={item?.liked}
            handleClickSave={() => {
              console.log('saved');
            }}
            additionalStyles="absolute top-1 right-1 h-5 w-5"
          />
        </div>

        {/* 우측 상품 정보 */}
        <div className="flex h-full flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            {/* 셀러 정보 */}
            <div className="flex items-center gap-1">
              <img
                className="h-[1.375rem] w-[1.375rem] rounded-full object-cover"
                src="/profile.png"
                alt={item.sellerNickname + '의 상품'}
              />
              <span className="caption-m text-grey09">
                @{item.sellerUsername}
              </span>
            </div>
            {/* 상품 제목 */}
            <div className="flex w-full flex-col items-start gap-0.5">
              <p className="body2-m line-clamp-1 text-black">{item.itemName}</p>
              {item.tagline && (
                <p className="caption-m text-grey09 line-clamp-1">
                  {item.tagline}
                </p>
              )}
            </div>
          </div>

          {/* 시간 칩 및 진행 회차 칩 */}
          <TimeChip
            open={item.startDate || '2025-07-09T00:00:00.000Z'} //추후 수정
            deadline={item.endDate || '2025-07-31T00:00:00.000Z'}
          />
        </div>
      </div>
    </article>
  );
};
export default HorizontalRankingCard;
