import { useGetMarketItemDetail } from '@/services/sellerItem/query/useGetMarketItemDetail';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';

const FaqItemBanner = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const { data: itemData } = useGetMarketItemDetail({ sellerId, itemId });
  const nameRef = useRef<HTMLSpanElement>(null);
  const [isTwoLines, setIsTwoLines] = useState(false);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const height = el.offsetHeight;
    const lineCount = Math.round(height / lineHeight);

    setIsTwoLines(lineCount >= 2);
  }, [itemData?.itemName]);

  const shouldCenter = !isTwoLines && !itemData?.tagline;

  return (
    <article className="border-grey02 flex w-full items-start justify-start gap-[.5625rem] border-b px-5 pb-[.875rem]">
      <img
        src={itemData?.itemImgList[0]}
        alt={`${itemData?.itemName} 이미지`}
        className="h-[3.125rem] w-[3.125rem] object-cover"
      />
      <div
        className={cn('flex h-full w-full flex-col gap-[.125rem] text-black', {
          'justify-center': shouldCenter,
        })}
      >
        <span
          className={cn('body2-b line-clamp-1', {
            'line-clamp-2': !itemData?.itemName,
          })}
        >
          {itemData?.itemName}
        </span>
        {itemData?.tagline && (
          <span className="body2-m line-clamp-1">{itemData?.tagline} </span>
        )}
      </div>
    </article>
  );
};

export default FaqItemBanner;
