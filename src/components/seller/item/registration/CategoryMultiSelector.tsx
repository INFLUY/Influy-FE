import { memo } from 'react';
import CategoryChip from '../../common/CategoryChip';
import { ItemFormValues } from '@/types/item.types';
import { useFormContext, useController } from 'react-hook-form';
import { CategoryType } from '@/types/common/CategoryType.types';
import { CATEGORY_MAX_COUNT } from '@/schemas/itemSchema';
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
    const handleClickCategory = (category: string) => {
      if (selectedList.includes(category)) {
        onChange(selectedList.filter((item: string) => item !== category));
      } else if (selectedList.length < CATEGORY_MAX_COUNT) {
        onChange([...selectedList, category]);
      }
    };

    return (
      <article className="flex w-full flex-col gap-y-3" ref={ref}>
        {/* 수정 필요 */}
        <div className="flex w-full justify-center gap-[.625rem]">
          {categoryList.slice(0, 5).map((category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.name}
              isSelected={selectedList.includes(category.name)}
              onToggle={() => handleClickCategory(category.name)}
            />
          ))}
        </div>
        <div className="flex w-full justify-center gap-x-3">
          {categoryList.slice(5, 9).map((category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.name}
              isSelected={selectedList.includes(category.name)}
              onToggle={() => handleClickCategory(category.name)}
            />
          ))}
        </div>
        <div className="flex w-full justify-center gap-x-3">
          {categoryList.slice(9).map((category: CategoryType) => (
            <CategoryChip
              key={category.id}
              text={category.name}
              isSelected={selectedList.includes(category.name)}
              onToggle={() => handleClickCategory(category.name)}
            />
          ))}
        </div>
      </article>
    );
  }
);
