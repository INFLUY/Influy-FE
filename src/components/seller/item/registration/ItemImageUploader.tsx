import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import cn from '@/utils/cn';
import { useFormContext, useController } from 'react-hook-form';
import DeleteIcon from '@/assets/icon/common/Delete.svg?react';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useEffect } from 'react';
import { usePostPresignedUrl } from '@/services/presignedUrl/usePostPresignedUrl';
import { ItemFormValues } from '@/types/item.types';

interface ItemImageUploaderProps {
  name: 'images';
}

export const ItemImageUploader = ({ name }: ItemImageUploaderProps) => {
  const { control } = useFormContext<ItemFormValues>();

  const {
    field: { value: images = [], onChange },
  } = useController<ItemFormValues, 'images'>({
    name,
    control,
    defaultValue: [],
  });

  const { showSnackbar } = useSnackbarStore();

  const { mutate: getPresignedUrl } = usePostPresignedUrl(
    (uploadedUrl: string) => {
      if (!uploadedUrl) return;
      onChange([...images, uploadedUrl]);
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        showSnackbar(`이미지 파일만 업로드 가능합니다: ${file.name}`);
      }
      return isImage;
    });

    if (validFiles.length === 0) {
      e.target.value = '';
      return;
    }

    const current = images.length;
    const combinedCount = current + validFiles.length;
    if (combinedCount > 10) {
      showSnackbar('이미지는 최대 10개까지 업로드 가능합니다.');
    }

    const limitedFiles = validFiles.slice(0, 10 - current);

    // presigned URL 요청 (업로드 완료 후에만 이미지 추가됨)
    limitedFiles.forEach((file) => getPresignedUrl({ file }));

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  useEffect(() => {
    return () => {
      // Blob URL 안 쓰므로 revoke 불필요
    };
  }, []);

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

      {/* 사진 미리보기 (업로드 완료된 URL만 표시) */}
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
    </article>
  );
};
