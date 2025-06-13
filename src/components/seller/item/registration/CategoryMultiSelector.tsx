import { memo } from 'react';
import CategoryChip from '../../common/CategoryChip';
import { ItemFormValues } from '@/types/item.types';
import { useFormContext, useController } from 'react-hook-form';
import { CategoryType } from '@/types/common/CategoryType.types';

interface CategoryMultiSelectorProps {
  name: keyof ItemFormValues; // 폼 필드 이름
  categoryList: CategoryType[];
  ref: React.RefObject<HTMLDivElement | null>; // 스크롤 이동을 위한 ref
}

export const CategoryMultiSelector = memo(
  ({ name, ref, categoryList }: CategoryMultiSelectorProps) => {
    const { control } = useFormContext();

    const {
      field: { value: selectedList, onChange },
    } = useController({
      name,
      control,
    });
    const handleClickCategory = (categoryId: number) => {
      if (selectedList.includes(categoryId)) {
        onChange(selectedList.filter((item: number) => item !== categoryId));
      } else if (selectedList.length < 3) {
        onChange([...selectedList, categoryId]);
      }
    };

    return (
      <article className="flex w-full flex-col gap-y-3" ref={ref}>
        {/* 수정 필요 */}
        <div className="flex w-full justify-center gap-[.625rem]">
          {categoryList.slice(0, 5).map((category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.category}
              isSelected={selectedList.includes(category.id)}
              onToggle={() => handleClickCategory(category.id)}
            />
          ))}
        </div>
        <div className="flex w-full justify-center gap-x-3">
          {categoryList.slice(5, 9).map((category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.category}
              isSelected={selectedList.includes(category.id)}
              onToggle={() => handleClickCategory(category.id)}
            />
          ))}
        </div>
        <div className="flex w-full justify-center gap-x-3">
          {categoryList.slice(9).map((category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.category}
              isSelected={selectedList.includes(category.id)}
              onToggle={() => handleClickCategory(category.id)}
            />
          ))}
        </div>
      </article>
    );
  }
);
