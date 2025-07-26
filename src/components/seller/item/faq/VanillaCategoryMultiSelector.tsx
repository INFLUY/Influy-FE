import { memo, SetStateAction } from 'react';
import CategoryChip from '@/components/seller/common/CategoryChip';
import { CategoryType } from '@/types/common/CategoryType.types';
import cn from '@/utils/cn';

// form을 사용하지 않는 category multi selector
interface BaseProps {
  categoryList: CategoryType[];
  selectedCategory: number[];
  max?: number; // 최대 선택 가능한 개수(기본 1개)
  theme?: 'faq' | 'item' | 'interest';
}

// disabled 있는 경우 setSelectedCategory는 없음
interface DisabledOnlyProps extends BaseProps {
  disabled: true;
  setSelectedCategory?: never;
}

// setSelectedCategory 있는 경우 disabled 없음
interface InteractiveProps extends BaseProps {
  disabled?: false;
  setSelectedCategory:
    | React.Dispatch<SetStateAction<number[]>>
    | ((value: number[]) => void);
}

type CategoryMultiSelectorProps = DisabledOnlyProps | InteractiveProps;

const VanillaCategoryMultiSelector = memo(
  ({
    selectedCategory,
    setSelectedCategory,
    categoryList,
    disabled = false,
    theme = 'faq',
    max = 1,
  }: CategoryMultiSelectorProps) => {
    const handleClickCategory = (categoryId: number) => {
      if (!disabled && setSelectedCategory) {
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
      }
    };

    return (
      <article
        className={cn(
          'flex w-full flex-wrap gap-2',
          theme === 'interest' && 'gap-x-3 gap-y-[14px]'
        )}
      >
        {categoryList.map((category: CategoryType) => (
          <CategoryChip
            key={category.id}
            text={category.name}
            isSelected={selectedCategory.includes(category.id)}
            onToggle={() => handleClickCategory(category.id)}
            theme={theme === 'interest' ? 'item' : theme}
            disabled={disabled}
          />
        ))}
      </article>
    );
  }
);

export default VanillaCategoryMultiSelector;
