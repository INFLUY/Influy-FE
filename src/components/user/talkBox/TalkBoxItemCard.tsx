import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';

export const TalkBoxBottomItemCard = ({
  itemName,
  tagline,
  mainImg,
  onItemCardClick,
}: {
  itemName: string;
  tagline: string | null;
  mainImg: string | null;
  onItemCardClick: () => void;
}) => {
  return (
    <button
      onClick={onItemCardClick}
      aria-label={`${itemName} 상세로 이동`}
      className="border-b-grey02 bg-grey01 sticky top-0 flex h-fit w-full cursor-pointer items-center gap-[.5625rem] self-stretch border-b border-solid px-5 py-[.9375rem]"
    >
      {/* 좌측 이미지 */}
      <div className="bg-grey03 relative aspect-square h-[3.125rem]">
        {mainImg && (
          <img
            className="aspect-square h-full rounded-[.0625rem] object-cover"
            src={mainImg}
            alt="상품 사진"
          />
        )}
      </div>
      {/* 우측 상품 정보 */}
      <div className="flex h-full flex-1 flex-col gap-0.5 text-left text-black">
        <p className="body2-b line-clamp-1">{itemName}</p>
        {tagline && <p className="body2-m line-clamp-1">{tagline}</p>}
      </div>
      <ArrowRightIcon className="text-grey07 h-4 w-4" />
    </button>
  );
};
