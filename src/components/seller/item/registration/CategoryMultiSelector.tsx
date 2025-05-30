import { memo } from 'react';
import CategoryChip from '../../common/CategoryChip';
import PRODUCT_CATEGORIES from '@/constants/productCategories';
import { ItemFormValues } from '@/types/item.types';
import { useFormContext, useController } from 'react-hook-form';

interface CategoryMultiSelectorProps {
  name: keyof ItemFormValues; // 폼 필드 이름
}

export const CategoryMultiSelector = memo(
  ({ name }: CategoryMultiSelectorProps) => {
    const { control } = useFormContext();

    const {
      field: { value: selectedList, onChange },
      fieldState: { error },
    } = useController({
      name,
      control,
    });
    const handleClickCategory = (category: string) => {
      if (selectedList.includes(category)) {
        onChange(selectedList.filter((item: string) => item !== category));
      } else if (selectedList.length < 3) {
        onChange([...selectedList, category]);
      }
    };

    return (
      <article className="flex w-full flex-col gap-y-4">
        {/* 수정 필요 */}
        <div className="flex w-full justify-center gap-4">
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
        {/* 에러 메세지 형식 수정 필요 */}
        {error && (
          <div className="mt-1 flex items-center space-x-1">
            <span className="caption-m text-error">
              {error?.message?.toString()}
            </span>
          </div>
        )}
      </article>
    );
  }
);
