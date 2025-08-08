//홈 아카이빙 인기 급상승 카드
import { ItemCardType } from '@/types/common/ItemType.types';
import {
  ItemLikeButton,
  PeriodChip,
  SoldOutChip,
  TimeChip,
} from '@/components';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import { isItemClosed } from '@/utils/itemDateUtils';

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
      <div
        className="flex h-[6.75rem] w-full cursor-pointer gap-2"
        onClick={onCardClick}
      >
        <div className="bg-grey03 relative h-[6.75rem] w-[6.75rem] rounded-[.0625rem]">
          <img
            className="h-[6.75rem] w-[6.75rem] rounded-[.0625rem] bg-white object-cover"
            src={item.itemMainImg ?? undefined}
            alt={item.itemName}
          />
          {isItemClosed(item.endDate) && (
            <div className="body2-m pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              마감
            </div>
          )}
          <ItemLikeButton
            liked={item.liked}
            sellerId={item.sellerId}
            itemId={item.itemId}
            additionalStyles="absolute top-1 right-1 h-5 w-5"
          />
          <div className="absolute bottom-0 left-0 flex flex-wrap">
            <PeriodChip period={item.itemPeriod} />
          </div>
        </div>

        {/* 우측 상품 정보 */}
        <div className="flex h-full flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            {/* 셀러 정보 */}
            <div className="flex items-center gap-1">
              <img
                className="h-[1.375rem] w-[1.375rem] rounded-full bg-white object-cover"
                src={item.sellerProfileImg ?? ProfileIcon}
                alt={item.sellerNickname}
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

          {/* 칩 */}
          {item.currentStatus === 'SOLD_OUT' ? (
            // 솔드아웃 상품의 경우
            <SoldOutChip />
          ) : (
            // 시간 칩
            <TimeChip open={item.startDate} deadline={item.endDate} />
          )}
        </div>
      </div>
    </article>
  );
};
export default HorizontalRankingCard;
