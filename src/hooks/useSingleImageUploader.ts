import { useSnackbarStore } from '@/store/snackbarStore';
import { useEffect, useRef } from 'react';

export const useSingleImageUploader = (onChange: (value: string) => void) => {
  const imageUrlRef = useRef<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImgs = e.target.files;
    if (!selectedImgs || selectedImgs.length === 0) return;

    const selectedImg = selectedImgs[0];

    const { showSnackbar } = useSnackbarStore();

    if (!selectedImg.type.startsWith('image/')) {
      showSnackbar(`이미지 파일만 업로드 가능합니다: ${selectedImg.name}`);
      e.target.value = '';
      return;
    }

    // 이전 URL revoke
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
    }

    const newUrl = URL.createObjectURL(selectedImg);
    imageUrlRef.current = newUrl;
    onChange(newUrl);
    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
      }
    };
  }, []);

  const removeFile = () => {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }
    onChange('');
  };

  return { handleFileChange, removeFile };
};
