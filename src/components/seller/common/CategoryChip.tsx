import cn from '@/utils/cn';

interface CategoryChipProps {
  text: string;
  isSelected?: boolean;
  onToggle?: () => void;
  theme?: 'item' | 'faq';
}

const CategoryChip = ({
  text,
  isSelected,
  onToggle,
  theme = 'item',
}: CategoryChipProps) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      className={cn(
        'body2-m flex h-fit w-fit cursor-pointer items-center justify-center',
        theme === 'item' && 'rounded-[1.25rem] px-2.5 py-1',
        theme === 'item' && isSelected
          ? 'bg-grey10 text-white'
          : 'bg-grey03 text-black',
        theme === 'faq' && 'rounded-[2.5rem] px-3 py-[.375rem]',
        theme === 'faq' && isSelected
          ? 'bg-grey10 text-white'
          : 'bg-grey01 text-black'
      )}
    >
      {text}
    </button>
  );
};
export default CategoryChip;
