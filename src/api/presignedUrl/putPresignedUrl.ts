import axios from 'axios';

export const putPresignedUrl = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  // 임시
  const fixJpgMimeType = (file: File): File => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' && file.type === 'image/jpeg') {
      return new File([file], file.name, { type: 'image/jpg' });
    }
    return file;
  };

  const fixedFile = fixJpgMimeType(file);

  const response = await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': fixedFile.type,
    },
  });

  if (response.status !== 200) {
    throw new Error('이미지 업로드 실패');
  }
};
