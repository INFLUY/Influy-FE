import { useSingleImageUploader } from '@/hooks/useSingleImageUploader';
import { useState } from 'react';
import CameraCircleIcon from '@/assets/icon/common/CameraCircle.svg?react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import ImageSelectBottomSheet from './profile/ImageSelectBottomSheet';

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
          className="text-grey02 absolute right-0 bottom-0 h-6 w-6 cursor-pointer"
        />
        <img
          src={value ?? ProfileIcon}
          alt={'프로필 이미지'}
          className="h-[5.625rem] w-[5.625rem] rounded-full bg-white object-cover"
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
        <ImageSelectBottomSheet
          id="profile-upload"
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          handleApplyBasicImage={handleApplyBasicImage}
        />
      )}
    </div>
  );
};
