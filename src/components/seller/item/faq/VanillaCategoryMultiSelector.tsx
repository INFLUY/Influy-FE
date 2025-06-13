import { memo, SetStateAction } from 'react';
import CategoryChip from '@/components/seller/common/CategoryChip';
import { CategoryType } from '@/types/common/CategoryType.types';

// form을 사용하지 않는 category multi selector
interface CategoryMultiSelectorProps {
  categoryList: CategoryType[];
  selectedCategory: number[];
  setSelectedCategory: React.Dispatch<SetStateAction<number[]>>;
  max?: number; // 최대 선택 가능한 개수(기본 1개)
}

const VanillaCategoryMultiSelector = memo(
  ({
    selectedCategory,
    setSelectedCategory,
    categoryList,
    max = 1,
  }: CategoryMultiSelectorProps) => {
    const handleClickCategory = (categoryId: number) => {
      if (selectedCategory.includes(categoryId)) {
        setSelectedCategory(
          selectedCategory.filter((item: number) => item !== categoryId)
        );
      } else if (max > 1 && selectedCategory.length < max) {
        setSelectedCategory([...selectedCategory, categoryId]);
      } else if (max === 1) {
        // 선택 가능한 카테고리 최대 개수가 1개일 경우
        setSelectedCategory([categoryId]);
      }
    };

    return (
      <article className="flex w-full flex-wrap gap-2">
        {categoryList.map((category: CategoryType) => (
          <CategoryChip
            key={category.id}
            text={category.category}
            isSelected={selectedCategory.includes(category.id)}
            onToggle={() => handleClickCategory(category.id)}
            theme="faq"
          />
        ))}
      </article>
    );
  }
);

export default VanillaCategoryMultiSelector;
