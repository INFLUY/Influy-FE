import BottomSheet from '@/components/common/BottomSheet';
import { useState } from 'react';
import {
  SaveButton,
  SellerModal,
  SnackBar,
  TextInput,
  WideTextArea,
} from '@/components';

const AddNoticeBottomSheet = ({
  noticeId,
  isOpen,
  setIsOpen,
}: {
  noticeId?: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isNoticeCancelModalOpen, setIsNoticeCancelModalOpen] =
    useState<boolean>(false);
  const [isNoticeEditCancelModalOpen, setIsNoticeEditCancelModalOpen] =
    useState<boolean>(false);
  const [isNoticeSavedSnackBarOpen, setIsNoticeSavedSnackBarOpen] =
    useState<boolean>(false);

  // 공지 저장
  const handleClickSave = () => {
    setIsNoticeSavedSnackBarOpen(true); // 스낵바
  };

  // 스낵바 닫을 때 bottom sheet도 닫아줘야함
  const handleDeletedSnackBarClose = () => {
    setIsNoticeSavedSnackBarOpen(false);
    setIsOpen(false);
  };

  // 공지 작성 취소
  const handleClickCancel = () => {
    setIsNoticeCancelModalOpen(true); // 삭제 모달
  };

  // 공지 작성 취소 모달 -> 취소
  const handleCancelNoticeModalClose = () => {
    setIsNoticeCancelModalOpen(false);
    setIsOpen(false);
  };

  // 공지 작성 취소 모달 -> 확인
  const handleNoticeCancelConfirm = () => {
    setIsNoticeCancelModalOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {!isNoticeSavedSnackBarOpen && (
        <BottomSheet
          onClose={() => setIsOpen(false)}
          isBottomSheetOpen={isOpen}
        >
          <div className="flex w-full flex-col items-center">
            <span className="flex w-full flex-col items-center gap-[.125rem]">
              <h1 className="subhead-b text-grey10 w-full text-center">
                {noticeId !== undefined ? '공지사항 수정' : '공지사항 추가'}
              </h1>
              <div className="divide-grey02 flex w-full flex-col justify-start gap-1 divide-y px-5">
                <div className="flex w-full flex-col gap-[.625rem] pt-3 pb-6">
                  <h2 className="body1-b">제목</h2>
                  <TextInput
                    text={title}
                    setText={setTitle}
                    placeHolderContent="제목을 입력해 주세요."
                  />
                </div>
                <div className="flex w-full flex-col gap-[.625rem] pt-3 pb-6">
                  <h2 className="body1-b">내용</h2>
                  <WideTextArea
                    text={content}
                    setText={setContent}
                    placeHolderContent="내용을 입력해 주세요."
                  />
                </div>
              </div>
            </span>
            <div className="scrollbar-hide flex w-full gap-[.4375rem] overflow-y-auto px-5 pt-1 pb-8">
              <SaveButton
                text="취소하기"
                activeColor="bg-grey07"
                onClick={handleClickCancel}
              />
              <SaveButton text="저장하기" onClick={handleClickSave} />
            </div>
          </div>
        </BottomSheet>
      )}

      {/* 공지사항 작성 취소 시 모달  */}
      {isNoticeCancelModalOpen && (
        <SellerModal
          text={`작성을 취소하시겠습니까?\n현재 내용은 모두 삭제됩니다.`}
          leftButtonClick={handleCancelNoticeModalClose}
          rightButtonClick={handleNoticeCancelConfirm}
          onClose={() => setIsNoticeCancelModalOpen(false)}
          setIsModalOpen={setIsNoticeCancelModalOpen}
        />
      )}

      {/* 공지사항 수정 취소 시 모달  */}
      {isNoticeEditCancelModalOpen && (
        <SellerModal
          text={`작성을 취소하시겠습니까?\n수정한 내용은 반영되지 않습니다.`}
          leftButtonClick={handleCancelNoticeModalClose}
          rightButtonClick={handleNoticeCancelConfirm}
          onClose={() => setIsNoticeEditCancelModalOpen(false)}
          setIsModalOpen={setIsNoticeEditCancelModalOpen}
        />
      )}

      {/* 스낵바 */}
      {isNoticeSavedSnackBarOpen && (
        <SnackBar handleSnackBarClose={handleDeletedSnackBarClose}>
          변경사항이 저장되었습니다.
        </SnackBar>
      )}
    </>
  );
};

export default AddNoticeBottomSheet;
