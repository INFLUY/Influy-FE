// 공통 컴포넌트 상품썸네일/유저뷰_아카이빙/앨범형
import { ItemCardType } from '@/types/common/ItemType.types';
import {
  SoldOutChip,
  TimeChip,
  PeriodChip,
  ItemLikeButton,
} from '@/components';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import { isItemClosed } from '@/utils/itemDateUtils';

const ItemAlbumCard = ({
  item,
  onCardClick,
}: {
  item: ItemCardType;
  onCardClick: () => void;
}) => {
  return (
    <article
      onClick={onCardClick}
      className="flex w-full cursor-pointer flex-col gap-1.5"
    >
      {/* 상단 사진 부분 */}
      <div className="bg-grey03 relative flex aspect-square h-fit w-full flex-1/2 shrink-0">
        <img
          src={item.itemMainImg ?? undefined}
          alt={item.itemName}
          className="inset-0 h-full w-full bg-white object-cover"
        />
        <ItemLikeButton
          liked={item.liked}
          sellerId={item.sellerId}
          itemId={item.itemId}
          additionalStyles="absolute top-2 right-3"
        />
        {isItemClosed(item.endDate) && (
          <div className="body2-m pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
            마감
          </div>
        )}

        <div className="absolute bottom-0 left-0 flex flex-wrap">
          {item.currentStatus === 'SOLD_OUT' ? (
            // 솔드아웃 상품의 경우
            <SoldOutChip />
          ) : (
            // 좌측 하단 회차 및 시간 칩
            <>
              <PeriodChip period={item.itemPeriod} />
              <TimeChip
                open={item.startDate ?? undefined}
                deadline={item.endDate ?? undefined}
              />
            </>
          )}
        </div>
      </div>

      {/* 하단 글 부분 */}
      <div className="flex w-full flex-col gap-1 px-2.5">
        {/* 셀러 정보 */}
        <div className="flex items-center gap-1">
          <img
            className="h-[1.375rem] w-[1.375rem] rounded-full bg-white object-cover"
            src={item.sellerProfileImg ?? ProfileIcon}
            alt={item.sellerNickname}
          />
          <span className="caption-m text-grey09">@{item.sellerUsername}</span>
        </div>
        <div className="flex h-[5.25rem] flex-col gap-1">
          <p className="body2-m line-clamp-2 text-black">{item.itemName}</p>
          {item.tagline && (
            <p className="caption-m text-grey09 line-clamp-2">{item.tagline}</p>
          )}
        </div>
      </div>
    </article>
  );
};
export default ItemAlbumCard;
