import { CategoryChip } from '@/components';
import { UserCategoryDTO } from '@/types/seller/TalkBox.types';
export const CategorySelectWrapper = ({
  viewList,
  selectedCategory,
  setSelectedCategory,
}: {
  viewList: UserCategoryDTO[];
  selectedCategory: UserCategoryDTO | null;
  setSelectedCategory: (value: UserCategoryDTO) => void;
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-[1.0625rem] rounded rounded-t-[.75rem] bg-white pt-4 pb-6 shadow-[0_.25rem_2.4312rem_0_rgba(0,0,0,0.15)]">
      <h2 className="body1-b px-5 text-[#242424]">
        해당 상품의 어떤 부분에 대해 질문하실 건가요?
      </h2>
      <div className="flex flex-wrap content-start items-start gap-[1.0625rem_.5rem] self-stretch px-5 py-0">
        {viewList.map((item, i) => (
          <CategoryChip
            key={i}
            text={item.questionCategoryName}
            theme="faq"
            isSelected={selectedCategory === item}
            onToggle={() => setSelectedCategory(item)}
          />
        ))}
      </div>
    </div>
  );
};
