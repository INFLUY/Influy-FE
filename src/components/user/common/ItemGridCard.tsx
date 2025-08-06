import {
  SoldOutChip,
  TimeChip,
  ItemLikeButton,
  PeriodChip,
} from '@/components';
import { ItemPreviewList } from '@/types/common/ItemType.types';
import cn from '@/utils/cn';
import { ITEM_DETAIL } from '@/utils/generatePath';
import { isItemClosed } from '@/utils/itemDateUtils';
import { generatePath, useNavigate } from 'react-router-dom';

export const ItemGridCard = ({ item }: { item: ItemPreviewList }) => {
  const navigate = useNavigate();
  return (
    <li
      className="flex w-full cursor-pointer flex-col gap-[.625rem] self-start"
      onClick={() =>
        navigate(
          generatePath(ITEM_DETAIL, {
            marketId: item.sellerId,
            itemId: item.itemId,
          })
        )
      }
    >
      {/* 썸네일 */}
      <div className="relative flex aspect-square w-full shrink-0 justify-end p-2">
        <img
          src={item.mainImg ?? undefined}
          alt="상품 썸네일"
          className="absolute inset-0 aspect-square h-full w-full bg-white object-cover"
        />
        <ItemLikeButton
          liked={item.liked}
          sellerId={item.sellerId}
          itemId={item.itemId}
        />
        {isItemClosed(item.endDate) && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
            마감
          </div>
        )}
        {/* 칩 */}
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
      <div
        className={cn('flex flex-col items-start gap-2', {
          'h-[5.25rem] justify-between gap-0': !item.tagline,
        })}
      >
        <div className="flex flex-shrink-0 flex-col justify-between gap-1 px-3 align-middle">
          <h1
            className={cn(
              'body2-m line-clamp-2',
              !item.tagline && 'line-clamp-none'
            )}
          >
            {item.itemName}
          </h1>
          <p className="text-grey09 caption-m line-clamp-2">{item.tagline}</p>
        </div>
      </div>
    </li>
  );
};
