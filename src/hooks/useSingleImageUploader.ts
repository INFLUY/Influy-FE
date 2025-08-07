import { usePostPresignedUrl } from '@/services/presignedUrl/usePostPresignedUrl';
import { useSnackbarStore } from '@/store/snackbarStore';

export const useSingleImageUploader = (
  onChange: (value: string | null) => void
) => {
  const { mutate: getPresignedUrl } = usePostPresignedUrl((imgUrl: string) => {
    onChange(imgUrl);
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImgs = e.target.files;
    if (!selectedImgs || selectedImgs.length === 0) return;

    const selectedImg = selectedImgs[0];

    const { showSnackbar } = useSnackbarStore.getState();

    if (!selectedImg.type.startsWith('image/')) {
      showSnackbar(`이미지 파일만 업로드 가능합니다: ${selectedImg.name}`);
      e.target.value = '';
      return;
    }

    getPresignedUrl({ file: selectedImg });
    e.target.value = '';
  };

  const removeFile = () => {
    onChange(null);
  };

  return { handleFileChange, removeFile };
};
