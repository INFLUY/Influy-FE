import { BottomSheet } from '@/components';

interface ImageSelectBottomSheetProps {
  id: string;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (open: boolean) => void;
  handleApplyBasicImage: () => void;
}

const ImageSelectBottomSheet = ({
  id,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  handleApplyBasicImage,
}: ImageSelectBottomSheetProps) => {
  return (
    <BottomSheet
      onClose={() => setIsBottomSheetOpen(false)}
      isBottomSheetOpen={isBottomSheetOpen}
    >
      <div className="divide-grey02 flex flex-col items-center divide-y px-5 pb-4">
        <label
          htmlFor={id}
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
  );
};

export default ImageSelectBottomSheet;
