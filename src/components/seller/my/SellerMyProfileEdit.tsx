import CameraCircleIcon from '@/assets/icon/common/CameraCircle.svg?react';
import SnackBar from '@/components/common/SnackBar';
import { useFormContext, useController } from 'react-hook-form';
import { useSingleImageUploader } from '@/hooks/useSingleImageUploader';
import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';

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

  const { handleFileChange, snackbar, setSnackbar } =
    useSingleImageUploader(onChange);

  return (
    <div className="bg-grey03 relative h-[5.625rem] w-[5.625rem] rounded-full">
      <label htmlFor="profile-upload" aria-label="프로필 이미지 업로드">
        <CameraCircleIcon
          aria-hidden="true"
          className="absolute right-0 bottom-0 cursor-pointer"
        />
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <img
        src={value === '' ? ProfileIcon : value}
        alt={'프로필 이미지'}
        className="h-full w-full rounded-full object-cover"
      />
      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
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

  const { handleFileChange, snackbar, setSnackbar } =
    useSingleImageUploader(onChange);

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
