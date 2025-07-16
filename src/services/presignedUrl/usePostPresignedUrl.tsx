import { postPresignedUrl } from '@/api/presignedUrl/postPresignedUrl';
import { handleReactQueryError } from '@/utils/handleError';
import { useMutation } from '@tanstack/react-query';

export const usePostPresignedUrl = (
  onSuccessCallback?: (imgUrl: string) => void
) => {
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const response = await postPresignedUrl(file.name);
      if (!response?.result) {
        throw new Error('presigned URL 요청 실패');
      }

      const { presignedUrl, imgUrl } = response.result;

      const res = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });
      if (!res.ok) {
        throw new Error('이미지 업로드 실패');
      }
      return imgUrl;
    },
    onSuccess: (imgUrl: string) => {
      onSuccessCallback?.(imgUrl);
    },
    onError: handleReactQueryError,
  });
};
