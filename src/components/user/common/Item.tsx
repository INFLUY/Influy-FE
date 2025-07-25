import { ScrapButton, ExtendChip, SoldOutChip, TimeChip } from '@/components';
import { ItemPreviewList } from '@/types/common/ItemType.types';
import cn from '@/utils/cn';

export const ItemGrid = ({ item }: { item: ItemPreviewList }) => {
  return (
    <li className="flex w-full cursor-pointer flex-col gap-[.625rem] self-start">
      {/* 썸네일 */}
      <div className="relative flex aspect-square w-full shrink-0 justify-end p-2">
        <img
          src={item?.mainImg ?? undefined}
          alt="상품 썸네일"
          className="bg-grey06 absolute inset-0 object-cover"
        />
        <ScrapButton
          scrapped={item?.liked}
          handleClickSave={() => {
            console.log('saved');
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
          마감
        </div>
        {/* 칩 */}
        {item?.currentStatus === 'SOLD_OUT' ? (
          <div className="absolute bottom-0 left-0">
            <SoldOutChip />
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 flex flex-wrap">
            <TimeChip open={item?.startDate!} deadline={item?.endDate!} />
            <ExtendChip
              extend={item?.currentStatus === 'EXTEND'}
              deadline={item?.endDate!}
            />
          </div>
        )}
      </div>
      <div
        className={cn('flex flex-col items-start gap-2', {
          'h-[5.25rem] justify-between gap-0': !item?.tagline,
        })}
      >
        <div className="flex flex-shrink-0 flex-col justify-between gap-1 px-3 align-middle">
          <h1
            className={cn(
              'body2-m line-clamp-2',
              !item?.tagline && 'line-clamp-none'
            )}
          >
            {item?.itemName}
          </h1>
          <p className="text-grey09 caption-m line-clamp-2">{item?.tagline}</p>
        </div>
      </div>
    </li>
  );
};
