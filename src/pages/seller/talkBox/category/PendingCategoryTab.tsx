import { useNavigate, generatePath } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { TalkBoxCategoryItem } from '@/components';
import { useTalkBoxCategoryContext } from '@/contexts/TalkBoxCategoryContext';

export const PendingCategoryTab = () => {
  const navigate = useNavigate();
  const { categoryData } = useTalkBoxCategoryContext();

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
      {categoryData &&
        categoryData.waitingCategoryList.length > 0 &&
        categoryData.waitingCategoryList.map((category) => (
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
