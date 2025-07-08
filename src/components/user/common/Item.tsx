import { ScrapButton, ExtendChip, SoldOutChip, TimeChip } from '@/components';
import { ItemType } from '@/types/common/ItemType.types';
import cn from '@/utils/cn';

export const ItemGrid = ({ item }: { item: ItemType }) => {
  return (
    <li className="flex w-full cursor-pointer flex-col gap-[.625rem] self-start">
      {/* 썸네일 */}
      <div className="relative flex aspect-square w-full shrink-0 justify-end p-2">
        <img
          src={item?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="absolute inset-0 object-cover"
        />
        <ScrapButton
          scrapped={item?.scrapped}
          handleClickSave={() => {
            console.log('saved');
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
          마감
        </div>
        {/* 칩 */}
        <span className="absolute bottom-0 left-0">
          {item?.soldOut ? (
            <SoldOutChip />
          ) : (
            <span className="flex flex-wrap gap-1">
              <TimeChip open={item?.open} deadline={item?.deadline} />
              <ExtendChip
                extend={item?.extend || false}
                deadline={item?.deadline}
              />
            </span>
          )}
        </span>
      </div>
      <div
        className={cn('flex flex-col items-start gap-2', {
          'h-[5.25rem] justify-between gap-0': !item?.content,
        })}
      >
        <div className="flex flex-shrink-0 flex-col justify-between gap-1 px-3 align-middle">
          <h1
            className={cn(
              'body2-m line-clamp-2',
              !item?.content && 'line-clamp-none'
            )}
          >
            {item?.title}
          </h1>
          <p className="text-grey09 caption-m line-clamp-2">{item?.content}</p>
        </div>
      </div>
    </li>
  );
};
