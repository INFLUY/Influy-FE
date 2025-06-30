import { useEffect, useRef, useState } from 'react';

export const useSingleImageUploader = (onChange: (value: string) => void) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const imageUrlRef = useRef<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImgs = e.target.files;
    if (!selectedImgs || selectedImgs.length === 0) return;

    const selectedImg = selectedImgs[0];

    if (!selectedImg.type.startsWith('image/')) {
      setSnackbar({
        open: true,
        message: `이미지 파일만 업로드 가능합니다: ${selectedImg.name}`,
      });
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

  return { handleFileChange, snackbar, setSnackbar };
};
