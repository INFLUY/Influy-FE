import { memo } from 'react';
import CategoryChip from '../../common/CategoryChip';

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

interface CategoryMultiSelectorProps {
  selectedList: string[];
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CategoryMultiSelector = memo(
  ({ selectedList, setSelectedList }: CategoryMultiSelectorProps) => {
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
  }
);
