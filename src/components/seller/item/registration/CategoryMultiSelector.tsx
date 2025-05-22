import cn from '@/utils/cn';
import { useState, memo } from 'react';

interface CategoryChipProps {
  text: string;
  isSelected: boolean;
  onToggle: () => void;
}

// 이 카테고리를 여기에 놔둘까요 아니면 constants/categories.ts 따로 만들어서 사용하는게 좋을까요?
const PRODUCT_CATEGORIES = [
  '뷰티',
  '패션',
  '푸드',
  '라이프',
  '디지털',
  '패션소품',
  '주얼리',
  '키즈',
  '스포츠/레저',
  '선물',
  '명품',
  '여행',
  '기념일',
  '기타',
] as const;

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

export const CategoryMultiSelector = memo(() => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  console.log(selectedList);

  const handleClickCategory = (category: string) => {
    if (selectedList.includes(category)) {
      setSelectedList(selectedList.filter((item) => item !== category));
    } else if (selectedList.length < 3) {
      setSelectedList([...selectedList, category]);
    }
  };

  return (
    <article className="flex w-full flex-col gap-y-4">
      <div className="flex w-full justify-center gap-x-3">
        {PRODUCT_CATEGORIES.slice(0, 5).map((category, index) => (
          <CategoryChip
            key={index}
            text={category}
            isSelected={selectedList.includes(category)}
            onToggle={() => handleClickCategory(category)}
          />
        ))}
      </div>
      <div className="flex w-full justify-center gap-x-3">
        {PRODUCT_CATEGORIES.slice(5, 9).map((category, index) => (
          <CategoryChip
            key={index}
            text={category}
            isSelected={selectedList.includes(category)}
            onToggle={() => handleClickCategory(category)}
          />
        ))}
      </div>
      <div className="flex w-full justify-center gap-x-3">
        {PRODUCT_CATEGORIES.slice(9).map((category, index) => (
          <CategoryChip
            key={index}
            text={category}
            isSelected={selectedList.includes(category)}
            onToggle={() => handleClickCategory(category)}
          />
        ))}
      </div>
    </article>
  );
});
