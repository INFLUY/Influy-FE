import { Suspense } from 'react';
import { CategoryChip, LoadingSpinner } from '@/components';
import { CategoryType } from '@/types/common/CategoryType.types';

interface Props {
  faqCategories: CategoryType[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number) => void;
  isFaqCategoryTop: boolean;
  itemDetailRef: React.RefObject<HTMLDivElement | null>;
  categoryAnchorRef: React.RefObject<HTMLDivElement | null>;
}

const FaqCategorySection = ({
  faqCategories,
  selectedCategoryId,
  setSelectedCategoryId,
  isFaqCategoryTop,
  itemDetailRef,
  categoryAnchorRef,
}: Props) => {
  return (
    <div className="relative px-5">
      {/* ref */}
      {itemDetailRef.current && (
        <div
          ref={categoryAnchorRef}
          className="absolute bottom-0 left-0 z-19 h-[1px] w-60"
        />
      )}

      <article className="flex w-full flex-wrap gap-2">
        <Suspense fallback={<LoadingSpinner />}>
          {faqCategories.length > 0 &&
            faqCategories.map((category: CategoryType) => (
              <CategoryChip
                key={category.id}
                text={category.name}
                isSelected={selectedCategoryId == category.id}
                onToggle={() => setSelectedCategoryId(category.id)}
                theme="faq"
              />
            ))}
        </Suspense>
      </article>

      {isFaqCategoryTop && (
        <div className="absolute top-0 z-1 h-full w-full bg-white" />
      )}
    </div>
  );
};

export default FaqCategorySection;
