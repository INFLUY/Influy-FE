import { useState } from 'react';

export const useSingleImageUploader = (onChange: (value: string) => void) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  // 파일 없음
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImgs = e.target.files;

    if (!selectedImgs || selectedImgs.length === 0) return;

    const selectedImg = selectedImgs[0];

    //파일 타입 검증
    if (!selectedImg.type.startsWith('image/')) {
      setSnackbar({
        open: true,
        message: `이미지 파일만 업로드 가능합니다: ${selectedImg.name}`,
      });
      e.target.value = '';
      return;
    }

    const imageUrl = URL.createObjectURL(selectedImg);
    onChange(imageUrl);
    e.target.value = '';
  };

  return { handleFileChange, snackbar, setSnackbar };
};
