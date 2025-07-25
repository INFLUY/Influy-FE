import ArrowRightIcon from '@/assets/icon/common/ArrowRight10.svg?react';

export const MoreButton = ({ onClickMore }: { onClickMore: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClickMore}
      aria-label="더보기"
      className="body2-m text-grey10 flex cursor-pointer items-center gap-[.1875rem]"
    >
      더보기
      <ArrowRightIcon className="h-2.5 w-2.5" />
    </button>
  );
};
