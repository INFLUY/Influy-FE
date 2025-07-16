import { useGetMarketItemDetail } from '@/services/sellerItem/query/useGetMarketItemDetail';

const FaqItemBanner = ({
  sellerId,
  itemId,
}: {
  sellerId: number;
  itemId: number;
}) => {
  const { data: itemData } = useGetMarketItemDetail(sellerId, itemId);

  return (
    <article className="border-grey02 flex w-full items-start justify-start gap-[.5625rem] border-b px-5 pb-[.875rem]">
      <img
        src="/img1.png"
        alt={`${itemData?.itemName} 이미지`}
        className="h-[3.125rem] w-[3.125rem] object-cover"
      />
      <div className="flex flex-col gap-[.125rem] text-black">
        <span className="body2-b line-clamp-1">{itemData?.itemName}</span>
        {itemData?.tagline && (
          <span className="body2-m line-clamp-1">{itemData?.tagline}</span>
        )}
      </div>
    </article>
  );
};

export default FaqItemBanner;
