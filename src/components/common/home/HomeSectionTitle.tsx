import ArrowRightMiniIcon from '@/assets/icon/common/ArrowRightMini.svg?react';

export const HomeSectionTitle = ({
  title,
  onClickMore,
}: {
  title: string;
  onClickMore: () => void;
}) => {
  return (
    <div className="flex items-center justify-between px-5">
      <span className="subhead-b text-black">{title}</span>
      <button
        type="button"
        onClick={onClickMore}
        aria-label="더보기"
        className="body2-m text-grey10 flex items-center gap-[3px]"
      >
        더보기
        <ArrowRightMiniIcon className="h-2.5 w-2.5" />
      </button>
    </div>
  );
};
