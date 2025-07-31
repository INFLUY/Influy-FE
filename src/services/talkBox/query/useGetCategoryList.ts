import { useSuspenseQuery } from '@tanstack/react-query';
import { getCategoryList } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';

export const useGetCategoryList = (itemId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_CATEGORY_LIST, itemId],
    queryFn: () => getCategoryList({ itemId }),
  });
};

// import { useLocation } from 'react-router-dom';
// export const findCategoryNameById = ({
//   itemId,
//   categoryId,
// }: {
//   itemId: number;
//   categoryId: number;
// }) => {
//   const { categoryName } = useLocation().state;
//   if (categoryName) return categoryName;

//   const { data } = useGetCategoryList(itemId);
//   const newCategoryName =
//     data.waitingCategoryList.find((c) => c.questionCategoryId === categoryId)
//       ?.questionCategoryName ?? '';
//   return newCategoryName;
// };
