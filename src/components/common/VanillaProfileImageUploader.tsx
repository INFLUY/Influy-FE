import { useSingleImageUploader } from '@/hooks/useSingleImageUploader';
import { useState } from 'react';
import BottomSheet from './BottomSheet';
import CameraCircleIcon from '@/assets/icon/common/CameraCircle.svg?react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';

type VanillaProfileImageUploaderProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

export const VanillaProfileImageUploader = ({
  value,
  onChange,
}: VanillaProfileImageUploaderProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const { handleFileChange, removeFile } = useSingleImageUploader(onChange);

  const handleApplyImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    setIsBottomSheetOpen(false);
  };

  const handleApplyBasicImage = () => {
    removeFile();
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="bg-grey03 relative h-[5.625rem] w-[5.625rem] rounded-full">
      <button
        type="button"
        onClick={() => setIsBottomSheetOpen(true)}
        aria-label="프로필 이미지 업로드"
      >
        <CameraCircleIcon
          aria-hidden="true"
          className="absolute right-0 bottom-0 cursor-pointer"
        />
        <img
          src={value ?? ProfileIcon}
          alt={'프로필 이미지'}
          className="h-full w-full rounded-full object-cover"
        />
      </button>

      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleApplyImage}
      />

      {isBottomSheetOpen && (
        <BottomSheet
          onClose={() => setIsBottomSheetOpen(false)}
          isBottomSheetOpen={isBottomSheetOpen}
        >
          <div className="divide-grey02 flex flex-col items-center divide-y px-5 pb-4">
            <label
              htmlFor="profile-upload"
              aria-label="프로필 이미지 업로드"
              className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
            >
              앨범에서 사진 선택
            </label>

            <button
              type="button"
              className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
              onClick={handleApplyBasicImage}
            >
              기본 이미지 적용
            </button>
            <button
              type="button"
              className="body1-b text-error w-full cursor-pointer py-4 text-center"
              onClick={() => setIsBottomSheetOpen(false)}
            >
              취소
            </button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};
