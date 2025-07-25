import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAddQuestionCategories } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';

export const usePostAddQuestionCategories = ({
  itemId,
}: {
  itemId: number;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (categoryList: string[]) =>
      postAddQuestionCategories({ itemId, categoryList }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_QUESTION_CATEGORY, itemId],
      });
      const path = generatePath(
        `../../${PATH.SELLER.talkBox.item.base}/${PATH.SELLER.talkBox.item.tabs.pending}`,
        {
          itemId: String(itemId),
        }
      );
      navigate(path, { replace: true, state: { isOnboarding: true } });
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
