import { QuestionCategoryDTO } from '@/types/common/TalkBox.types';
import { QuestionCountBadge } from '@/components';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';

export const TalkBoxCategoryItem = ({
  category,
  handleCategoryClick,
  mode,
}: {
  category: QuestionCategoryDTO;
  handleCategoryClick: (categoryId: number, categoryName: string) => void;
  mode: 'pending' | 'answered';
}) => {
  return (
    <article
      className="flex w-full cursor-pointer items-center justify-between px-5 py-0"
      key={category.questionCategoryId}
      onClick={() => {
        handleCategoryClick(
          category.questionCategoryId,
          category.questionCategoryName
        );
      }}
    >
      <div className="flex gap-0.5 text-black">
        <span className="body1-b">{category.questionCategoryName}</span>
        {(category.questionCnt ?? 0) > 0 && (
          <span className="body1-m">({category.questionCnt})</span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {mode === 'pending' &&
        category.unCheckedCnt &&
        category.unCheckedCnt > 0 ? (
          <QuestionCountBadge count={category.unCheckedCnt} />
        ) : null}
        <ArrowRightIcon className="text-grey07 h-4 w-4" />
      </div>
    </article>
  );
};
