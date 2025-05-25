import { memo } from 'react';
import CategoryChip from '../../common/CategoryChip';
import PRODUCT_CATEGORIES from '@/constants/productCategories';

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
