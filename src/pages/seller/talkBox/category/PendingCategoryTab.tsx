import { useNavigate, generatePath, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { TalkBoxCategoryItem } from '@/components';
import { useGetQuestionCategory } from '@/services/talkBox/query/useGetQuestionCategory';

export const PendingCategoryTab = () => {
  const navigate = useNavigate();
  const { itemId, categoryId } = useParams();

  const { questionCategories } = useGetQuestionCategory({
    itemId: Number(itemId),
    sellerId: 2,
  });

  const handleCategoryClick = (categoryId: number) => {
    const path = generatePath(
      `../${PATH.SELLER.talkBox.item.category.base}/${PATH.SELLER.talkBox.item.category.tabs.pending}`,
      {
        categoryId: String(categoryId),
      }
    );
    navigate(path);
  };

  return (
    <section className="mt-[1.625rem] flex w-full flex-col items-start gap-8">
      {questionCategories &&
        questionCategories.length > 0 &&
        questionCategories.map((category) => (
          <TalkBoxCategoryItem
            key={category.questionCategoryId}
            category={category}
            handleCategoryClick={handleCategoryClick}
            mode="pending"
          />
        ))}
    </section>
  );
};
