import CameraCircleIcon from '@/assets/icon/common/CameraCircle.svg?react';
import { useFormContext, useController } from 'react-hook-form';
import { useSingleImageUploader } from '@/hooks/useSingleImageUploader';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import { useState } from 'react';
import ImageSelectBottomSheet from '@/components/common/profile/ImageSelectBottomSheet';

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

  const { handleFileChange, removeFile } = useSingleImageUploader(onChange);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

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
        role="button"
        aria-label="프로필 이미지 업로드"
        className="text-grey02 absolute right-0 bottom-0 h-6 w-6 cursor-pointer"
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
        className="h-full w-full rounded-full bg-white object-cover"
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

export const BackgroundImageUploader = ({ name }: { name: string }) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const { handleFileChange, removeFile } = useSingleImageUploader(onChange);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const handleApplyImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    setIsBottomSheetOpen(false);
  };

  const handleApplyBasicImage = () => {
    removeFile();
    setIsBottomSheetOpen(false);
  };

  return (
    <article className="relative flex h-[7.75rem] w-full bg-[rgba(0,0,0,0.20)]">
      <button
        type="button"
        className="bg-grey02 border-grey04 absolute top-[.75rem] right-[1.0625rem] flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-1"
        aria-label="배경 이미지 업로드"
        onClick={() => setIsBottomSheetOpen(true)}
      >
        <CameraCircleIcon className="text-grey02 h-6 w-6" aria-hidden="true" />
      </button>
      <input
        id="background-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleApplyImage}
      />
      {value && (
        <img
          src={value}
          alt={'배경 이미지'}
          className="h-full w-full object-cover"
        />
      )}
      {isBottomSheetOpen && (
        <ImageSelectBottomSheet
          id="background-upload"
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          handleApplyBasicImage={handleApplyBasicImage}
        />
      )}
    </article>
  );
};
