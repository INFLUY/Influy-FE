import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import cn from '@/utils/cn';

interface ItemImageUploaderProps {
  images: string[]; // 미리보기용 URL 배열
  onAddImage: (file: File) => void;
  onRemoveImage: (index: number) => void;
}

export const ItemImageUploader = ({
  images,
  onAddImage,
  onRemoveImage,
}: ItemImageUploaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAddImage(e.target.files[0]);
    }
  };

  return (
    <article className="scrollbar-hide flex w-full flex-nowrap gap-x-1.5 overflow-x-scroll py-4 pl-5">
      {/* 사진 추가 박스 */}
      <label className="bg-grey03 m-1 flex h-[3.75rem] w-[3.75rem] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[.1875rem]">
        <CameraIcon />
        <span className="text-grey07 caption-m mt-0.5">{images.length}/10</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* 사진 미리보기 */}

      {images.map((url, index) => (
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
            onClick={() => onRemoveImage(index)}
            className="bg-grey09 absolute -top-2 -right-2 h-4 w-4 rounded-full text-[.5rem] text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </article>
  );
};
