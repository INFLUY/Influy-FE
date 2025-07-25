import { useMutation } from '@tanstack/react-query';
import { postGenerateQuestionCategory } from '@/api/talkBox/handleQuestionCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQueryClient } from '@tanstack/react-query';

export const usePostGenerateQuestionCategory = ({
  itemId,
  onSuccessCallback,
}: {
  itemId: number;
  onSuccessCallback?: (names: string[]) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postGenerateQuestionCategory({ itemId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_QUESTION_CATEGORY, itemId],
      });

      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
