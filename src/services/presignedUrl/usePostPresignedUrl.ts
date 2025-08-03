import { postPresignedUrl } from '@/api/presignedUrl/postPresignedUrl';
import { putPresignedUrl } from '@/api/presignedUrl/putPresignedUrl';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation } from '@tanstack/react-query';

export const usePostPresignedUrl = (
  onSuccessCallback?: (imgUrl: string) => void
) => {
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const response = await postPresignedUrl(file.name);
      if (!response) {
        throw new Error('presigned URL 요청 실패');
      }

      const { presignedUrl, imgUrl } = response;

      await putPresignedUrl(presignedUrl, file);
      return imgUrl;
    },
    onSuccess: (imgUrl: string) => {
      onSuccessCallback?.(imgUrl);
    },
    onError: handleReactQueryError,
  });
};
