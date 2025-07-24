import { useNavigate, generatePath, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { TalkBoxCategoryItem } from '@/components';
import { useState, useEffect } from 'react';
//TODO: 삭제 필요
import { dummyQuestionCategories } from '../talkboxMockData';
import { QuestionCategoryDTO } from '@/types/seller/TalkBox.types';

export const AnsweredCategoryTab = () => {
  const [categoryList, setCategoryList] = useState<QuestionCategoryDTO[]>([]);

  const navigate = useNavigate();
  const { itemId } = useParams();
  const handleCategoryClick = (categoryId: number) => {
    const path = generatePath(
      `${PATH.SELLER.base}/${PATH.SELLER.talkBox.base}/${PATH.SELLER.talkBox.item.base}/${PATH.SELLER.talkBox.item.category.base}/${PATH.SELLER.talkBox.item.category.tabs.answered}`,
      {
        itemId: String(itemId),
        categoryId: String(categoryId),
      }
    );
    navigate(path);
  };

  //임시
  useEffect(() => {
    setCategoryList(dummyQuestionCategories);
  }, []);

  return (
    <section className="mt-[1.625rem] flex w-full flex-col items-start gap-8">
      {categoryList &&
        categoryList.length > 0 &&
        categoryList.map((category) => (
          <TalkBoxCategoryItem
            key={category.questionCategoryId}
            category={category}
            handleCategoryClick={handleCategoryClick}
            mode="answered"
          />
        ))}
    </section>
  );
};
