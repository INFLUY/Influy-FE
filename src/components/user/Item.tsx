import ScrapButton from '@/components/user/ScrapButton';
import { ExtendChip, SoldOutChip, TimeChip } from '@/components/user/Chip';
import { ItemType } from '@/types/types';
import cn from '@/utils/cn';

export const ItemList = ({ item }: { item: ItemType }) => {
  return (
    <li className="flex cursor-pointer items-center justify-center gap-3 self-stretch px-5">
      {/* 썸네일 */}
      <div className="relative flex h-30 w-30 shrink-0">
        <img
          src={item?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
          마감
        </div>
      </div>
      <div className="flex h-full flex-shrink-0 flex-grow basis-0 items-start justify-between gap-1">
        <div className="flex h-full flex-shrink-0 flex-grow basis-0 flex-col justify-between align-middle">
          <span className="flex flex-col justify-between gap-1">
            <span className="text-grey07 caption-m line-clamp-1">
              {item?.name}
            </span>
            <span className="flex flex-col items-start gap-[.125rem] self-stretch">
              <h1 className="body2-m line-clamp-2">{item?.title}</h1>
              <p className="text-grey09 caption-m line-clamp-1">
                {item?.content}
              </p>
            </span>
          </span>
          {/* 칩 */}
          <span className="flex">
            {item?.soldOut ? (
              <SoldOutChip />
            ) : (
              <span className="flex gap-1">
                <TimeChip open={item?.open} deadline={item?.deadline} />
                <ExtendChip
                  extend={item?.extend || false}
                  deadline={item?.deadline}
                />
              </span>
            )}
          </span>
        </div>
        <ScrapButton scrapped={item?.scrapped} handleClickSave={() => {}} />
      </div>
    </li>
  );
};

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
      </div>
      <div
        className={cn('flex flex-col items-start gap-2', {
          'h-[7rem] justify-between gap-0': !item?.content,
        })}
      >
        <div className="flex flex-shrink-0 flex-grow basis-0 flex-col justify-between gap-2 align-middle">
          <span className="flex flex-col gap-1">
            <span className="text-grey07 caption-m line-clamp-1">
              {item?.name}
            </span>
            <h1 className="body2-m line-clamp-2">{item?.title}</h1>
            <p className="text-grey09 caption-m line-clamp-1">
              {item?.content}
            </p>
          </span>
          {/* 칩 */}
          <span className="flex">
            {item?.soldOut ? (
              <SoldOutChip />
            ) : (
              <span className="flex gap-1">
                <TimeChip open={item?.open} deadline={item?.deadline} />
                <ExtendChip
                  extend={item?.extend || false}
                  deadline={item?.deadline}
                />
              </span>
            )}
          </span>
        </div>
      </div>
    </li>
  );
};
