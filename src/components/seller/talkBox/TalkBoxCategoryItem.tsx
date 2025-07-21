import { QuestionCategory } from '@/types/seller/TalkBox.types';
import { QuestionCountBadge } from '@/components';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';

export const TalkBoxCategoryItem = ({
  category,
  handleCategoryClick,
  mode,
}: {
  category: QuestionCategory;
  handleCategoryClick: (categoryId: number) => void;
  mode: 'pending' | 'answered';
}) => {
  return (
    <article
      className="flex w-full cursor-pointer items-center justify-between px-5 py-0"
      key={category.id}
      onClick={() => {
        handleCategoryClick(category.id);
      }}
    >
      <div className="flex gap-0.5 text-black">
        <span className="body1-b">{category.category}</span>
        {(category.pendingCount ?? 0) > 0 && (
          <span className="body1-m">({category.pendingCount})</span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {mode === 'pending' &&
          category.totalCount &&
          category.totalCount > 0 && (
            <QuestionCountBadge count={category.totalCount} />
          )}
        <ArrowRightIcon className="text-grey07 h-4 w-4" />
      </div>
    </article>
  );
};
