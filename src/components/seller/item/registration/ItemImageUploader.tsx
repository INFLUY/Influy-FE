import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import cn from '@/utils/cn';
import { useFormContext, useController } from 'react-hook-form';

interface ItemImageUploaderProps {
  name: string;
}

export const ItemImageUploader = ({ name }: ItemImageUploaderProps) => {
  const { control } = useFormContext();

  const {
    field: { value: images, onChange },
  } = useController({
    name,
    control,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      if (images.length >= 10) {
        alert('이미지는 최대 10개까지 업로드할 수 있습니다.');
        return;
      }
      onChange([...images, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_: string, i: number) => i !== index));
  };

  return (
    <article className="scrollbar-hide flex w-full flex-nowrap gap-x-1.5 overflow-x-scroll py-4 pl-5">
      {/* 사진 추가 박스 */}
      <label className="bg-grey03 m-1 flex h-[3.75rem] w-[3.75rem] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[.1875rem]">
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
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* 사진 미리보기 */}

      {images.map((url: string, index: number) => (
        <div
          key={index}
          className={cn(
            'bg-grey03 relative m-1 flex h-[3.75rem] w-[3.75rem] shrink-0 cursor-pointer overflow-visible rounded-[.1875rem]',
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
            className="bg-grey09 absolute -top-2 -right-2 h-4 w-4 rounded-full text-[.5rem] text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </article>
  );
};
