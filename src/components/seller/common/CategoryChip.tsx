import cn from '@/utils/cn';

interface CategoryChipProps {
  text: string;
  isSelected?: boolean;
  onToggle?: () => void;
}

const CategoryChip = ({ text, isSelected, onToggle }: CategoryChipProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'body2-m flex h-fit w-fit items-center justify-center gap-2.5 rounded-[1.25rem] px-2.5 py-1',
        isSelected ? 'bg-grey10 text-white' : 'bg-grey03 text-black'
      )}
    >
      {text}
    </button>
  );
};
export default CategoryChip;
