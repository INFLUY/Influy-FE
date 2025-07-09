// 공통 컴포넌트 상품썸네일/유저뷰_아카이빙/앨범형
import { ItemCardType } from '@/types/common/ItemType.types';
import { ScrapButton, SoldOutChip, TimeChip, PeriodChip } from '@/components';

const ItemAlbumCard = ({
  item,
  onCardClick,
}: {
  item: ItemCardType;
  onCardClick: () => void;
}) => {
  return (
    <article className="flex w-full cursor-pointer flex-col gap-1.5">
      {/* 상단 사진 부분 */}
      <div className="bg-grey03 relative flex aspect-square w-full shrink-0 rounded-[.1875rem]">
        <img
          src={item?.mainImg ?? undefined}
          alt="상품 썸네일"
          className="inset-0 h-full w-full rounded-[.1875rem] object-cover"
        />
        <ScrapButton
          scrapped={item?.isScrapped}
          handleClickSave={() => {
            console.log('saved');
          }}
          additionalStyles="absolute top-2 right-3"
        />
        {item.currentStatus === 'SOLD_OUT' && (
          <div className="body2-m pointer-events-none absolute inset-0 flex items-center justify-center rounded-[.1875rem] bg-black/40 text-white">
            마감
          </div>
        )}

        <div className="absolute bottom-0 left-0 flex flex-wrap">
          {item.currentStatus === 'SOLD_OUT' ? (
            // 마감 상품의 경우
            <SoldOutChip />
          ) : (
            // 좌측 하단 회차 및 시간 칩
            <>
              {item.itemPeriod && <PeriodChip period={item.itemPeriod} />}
              <TimeChip
                open={item.startDate || '2025-07-09T00:00:00.000Z'} //추후 수정
                deadline={item.endDate || '2025-07-31T00:00:00.000Z'}
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
            className="h-[1.375rem] w-[1.375rem] rounded-full object-cover"
            src="/profile.png"
            alt={item.sellerName + '의 상품'}
          />
          <span className="caption-m text-grey09">@{item.sellerName}</span>
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
