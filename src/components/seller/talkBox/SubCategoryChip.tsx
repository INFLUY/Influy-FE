import cn from '@/utils/cn';

interface SubCategoryChipProps {
  text: string;
  count: number;
  isSelected?: boolean;
  onClickChip?: () => void;
  hasNew?: boolean;
}

export const SubCategoryChip = ({
  text,
  isSelected,
  onClickChip,
  hasNew = false,
  count,
}: SubCategoryChipProps) => {
  return (
    <button
      onClick={onClickChip}
      type="button"
      tabIndex={0}
      className={cn(
        'body2-m flex w-fit shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[2.4375rem] px-3 py-1.5',
        isSelected
          ? 'bg-grey11 text-grey01'
          : 'border-grey03 border bg-white text-black'
      )}
    >
      {hasNew && (
        <div className="bg-main aspect-[1/1] h-1.5 w-1.5 rounded-full" />
      )}
      {text} ({count})
    </button>
  );
};
