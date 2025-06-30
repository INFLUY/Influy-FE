import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import cn from '@/utils/cn';
import { useFormContext, useController } from 'react-hook-form';
import SnackBar from '@/components/common/SnackBar';
import { useState } from 'react';
import DeleteIcon from '@/assets/icon/common/Delete.svg?react';
interface ItemImageUploaderProps {
  name: string;
}

export const ItemImageUploader = ({ name }: ItemImageUploaderProps) => {
  const { control } = useFormContext();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const {
    field: { value: images = [], onChange },
  } = useController({
    name,
    control,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList = Array.from(e.target.files || []);

    //파일 타입 검증
    const validImage = imageList.filter((file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        setSnackbar({
          open: true,
          message: `이미지 파일만 업로드 가능합니다: ${file.name}`,
        });
      }
      return isImage;
    });
    if (validImage.length === 0) {
      // 이미지 파일이 하나도 없는 경우 바로 리턴
      e.target.value = '';
      return;
    }
    //Blob URL 생성
    const newUrls = validImage.map((img) => URL.createObjectURL(img));

    const combined = [...images, ...newUrls];
    if (combined.length > 10) {
      setSnackbar({
        open: true,
        message: '이미지는 최대 10개까지 업로드 가능합니다.',
      });
    }
    const limited = combined.slice(0, 10);

    onChange(limited);

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const urlToRemove = images[index];
    URL.revokeObjectURL(urlToRemove);
    const updated = images.filter((_: string, i: number) => i !== index);
    onChange(updated);
  };

  return (
    <article className="flex w-full flex-nowrap items-center gap-x-1.5 pl-5">
      {/* 사진 추가 박스 */}
      <label className="bg-grey03 mt-[1.125rem] mb-5 flex h-[3.75rem] w-[3.75rem] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[.1875rem]">
        <CameraIcon />
        <span
          className={cn(
            'caption-m mt-0.5',
            images.length == 0 ? 'text-grey07' : 'text-grey10'
          )}
        >
          {images.length}/10
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* 사진 미리보기 */}
      <div className="scrollbar-hide flex gap-x-1.5 overflow-x-scroll pt-[.875rem] pr-5 pb-4">
        {images.map((url: string, index: number) => (
          <div
            key={index}
            className={cn(
              'bg-grey03 relative m-1 flex h-[3.75rem] w-[3.75rem] shrink-0 overflow-visible rounded-[.1875rem]',
              index === 0 && 'border-3 border-[#6C6C6C]'
            )}
          >
            <img
              src={url}
              alt={`상품 이미지 ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 h-4 w-4 cursor-pointer"
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>

      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
      )}
    </article>
  );
};
