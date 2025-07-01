import cn from '@/utils/cn';

interface CategoryChipProps {
  text: string;
  isSelected?: boolean;
  onToggle?: () => void;
  theme?: 'item' | 'faq';
  disabled?: boolean;
}

const CategoryChip = ({
  text,
  isSelected,
  onToggle,
  theme = 'item',
  disabled = false,
}: CategoryChipProps) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      tabIndex={0}
      className={cn(
        'body2-m flex h-[33px] w-fit shrink-0 cursor-pointer items-center justify-center',
        theme === 'item' && 'rounded-[1.25rem] px-2.5 py-1',
        theme === 'item' &&
          (isSelected ? 'bg-grey10 text-white' : 'bg-grey03 text-black'),
        theme === 'faq' && 'rounded-[2.5rem] px-3 py-[.375rem]',
        theme === 'faq' &&
          (isSelected
            ? 'bg-grey10 text-white'
            : disabled
              ? 'bg-grey01 text-black opacity-40'
              : 'bg-grey01 text-black')
      )}
    >
      {text}
    </button>
  );
};
export default CategoryChip;
