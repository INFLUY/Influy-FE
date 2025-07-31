import { useMutation } from '@tanstack/react-query';
import { postAddQuestionCategories } from '@/api/talkBox/handleQuestionCategory.api';

export const usePostAddQuestionCategories = ({
  itemId,
}: {
  itemId: number;
}) => {
  return useMutation({
    mutationFn: (categoryList: string[]) =>
      postAddQuestionCategories({ itemId, categoryList }),
    onSuccess: () => {},
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
