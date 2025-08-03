import axios from 'axios';

export const putPresignedUrl = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  const response = await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  if (response.status !== 200) {
    throw new Error('이미지 업로드 실패');
  }
};
