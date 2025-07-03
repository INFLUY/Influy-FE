import SnackBar from '@/components/common/SnackBar';
import { useFormContext, useController } from 'react-hook-form';
import { useSingleImageUploader } from '@/hooks/useSingleImageUploader';
import CameraIcon from '@/assets/icon/common/Camera.svg?react';
import ImageResizeIcon from '@/assets/icon/seller/ImageResizeIcon.svg?react';
import Delete2Icon from '@/assets/icon/common/Delete2Icon.svg?react';
import Edit2Icon from '@/assets/icon/common/Edit2Icon.svg?react';
import cn from '@/utils/cn';
import { SetStateAction } from 'react';

export const FaqImageUploader = ({
  name,
  adjustImg,
  setAdjustImg,
}: {
  name: string;
  adjustImg: boolean;
  setAdjustImg:
    | React.Dispatch<SetStateAction<boolean>>
    | ((value: boolean) => void);
}) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const { handleFileChange, snackbar, setSnackbar, removeFile } =
    useSingleImageUploader(onChange);

  return (
    <article
      className={cn(
        'flex aspect-square w-full',
        value
          ? 'relative flex-col justify-between bg-black px-[1.125rem] py-4'
          : 'bg-grey03'
      )}
    >
      <input
        id="background-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 사진 선택 전 */}
      {!value && (
        <label
          htmlFor="background-upload"
          aria-label="프로필 이미지 업로드"
          className="flex h-full w-full cursor-pointer items-center justify-center"
        >
          <CameraIcon
            className="h-[4.625rem] w-[4.625rem]"
            aria-hidden="true"
          />
        </label>
      )}

      {/* 사진 선택 후 */}
      {value && (
        <>
          <ImageResizeIcon
            className="z-10 cursor-pointer"
            onClick={() => setAdjustImg((prev) => !prev)}
          />
          <img
            src={value}
            alt={'배경 이미지'}
            className={cn(
              'absolute inset-0 h-full w-full',
              adjustImg ? 'object-contain' : 'object-cover'
            )}
          />
          <div className="z-10 flex h-fit w-full min-w-0 justify-between gap-[.625rem]">
            <button
              type="button"
              className="bg-grey11 flex h-fit w-full cursor-pointer items-center justify-center gap-1 rounded-[.125rem] px-5 py-[.875rem] text-white"
              onClick={removeFile}
            >
              <Delete2Icon />
              <span>삭제하기</span>
            </button>
            <label
              htmlFor="background-upload"
              className="bg-grey07 flex h-fit w-full cursor-pointer items-center justify-center gap-1 rounded-[.125rem] px-5 py-[.875rem] text-white"
            >
              <Edit2Icon />
              <span>사진 변경하기</span>
            </label>
          </div>
        </>
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

export default FaqImageUploader;
