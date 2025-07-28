import { useNavigate, generatePath, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { TalkBoxCategoryItem } from '@/components';
import { useGetCategoryList } from '@/services/talkBox/query/useGetCategoryList';

export const PendingCategoryTab = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const { data } = useGetCategoryList(Number(itemId));

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
      {data &&
        data.categoryList.length > 0 &&
        data.categoryList.map((category) => (
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
