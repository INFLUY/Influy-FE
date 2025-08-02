import CameraCircleIcon from '@/assets/icon/common/CameraCircle.svg?react';
import { useFormContext, useController } from 'react-hook-form';
import { useSingleImageUploader } from '@/hooks/useSingleImageUploader';
import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import BottomSheet from '@/components/common/BottomSheet';
import { useState } from 'react';

export const ProfileEditWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <article
      className="flex w-full flex-col items-center gap-3 px-5"
      aria-label={title}
    >
      <h2 className="text-grey10 body1-b w-full">{title}</h2>
      {children}
    </article>
  );
};

export const ProfileImageUploader = ({ name }: { name: string }) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

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
      <CameraCircleIcon
        aria-hidden="true"
        className="absolute right-0 bottom-0 cursor-pointer"
        onClick={() => setIsBottomSheetOpen(true)}
      />
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleApplyImage}
      />
      <img
        src={value ?? ProfileIcon}
        alt={'프로필 이미지'}
        className="h-full w-full rounded-full object-cover"
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

export const BackgroundImageUploader = ({ name }: { name: string }) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const { handleFileChange } = useSingleImageUploader(onChange);

  return (
    <article className="relative flex h-[7.75rem] w-full bg-[rgba(0,0,0,0.20)]">
      <label
        className="bg-grey02 border-grey04 absolute top-[.75rem] right-[1.0625rem] flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-1"
        htmlFor="background-upload"
        aria-label="프로필 이미지 업로드"
      >
        <CameraIcon aria-hidden="true" />
      </label>
      <input
        id="background-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {value && (
        <img
          src={value}
          alt={'배경 이미지'}
          className="h-full w-full object-cover"
        />
      )}
    </article>
  );
};
