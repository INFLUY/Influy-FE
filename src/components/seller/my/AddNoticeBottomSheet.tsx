import BottomSheet from '@/components/common/BottomSheet';
import { useState } from 'react';
import {
  DefaultButton,
  SellerModal,
  TextInput,
  WideTextArea,
} from '@/components';
import { usePostNotification } from '@/services/notification/mutation/usePostNotification';
import { NoticeType } from '@/types/common/NoticeType.types';
import { usePatchNotification } from '@/services/notification/mutation/usePatchNotification';

const AddNoticeBottomSheet = ({
  announcement,
  isOpen,
  setIsOpen,
  setIsNoticeSavedSnackBarOpen,
}: {
  announcement?: NoticeType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNoticeSavedSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState<string>(announcement?.title || '');
  const [content, setContent] = useState<string>(announcement?.content || '');
  const [isNoticeCancelModalOpen, setIsNoticeCancelModalOpen] =
    useState<boolean>(false);
  const [isNoticeEditCancelModalOpen, setIsNoticeEditCancelModalOpen] =
    useState<boolean>(false);

  const { mutate: postNotice } = usePostNotification(() => {
    setIsNoticeSavedSnackBarOpen(true);
  });

  const { mutate: patchNotice } = usePatchNotification(() => {
    setIsNoticeSavedSnackBarOpen(true);
  });

  // 공지 저장(수정)
  const handleClickSave = () => {
    setIsOpen(false);
    if (announcement) {
      patchNotice({
        data: { title, content },
        announcementId: announcement.id,
      }); // 공지사항 수정
    } else {
      postNotice({ title, content }); // 공지사항 추가
    }
  };

  // 공지 작성 취소
  const handleClickCancel = () => {
    setIsNoticeCancelModalOpen(true); // 삭제 모달
  };

  // 공지 작성 취소 모달 -> 취소
  const handleCancelNoticeModalClose = () => {
    setIsNoticeCancelModalOpen(false);
  };

  // 공지 작성 취소 모달 -> 확인
  const handleNoticeCancelConfirm = () => {
    setIsNoticeCancelModalOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <BottomSheet onClose={handleClickCancel} isBottomSheetOpen={isOpen}>
        <div className="flex w-full flex-col items-center">
          <span className="flex w-full flex-col items-center gap-[.125rem]">
            <h1 className="subhead-b text-grey10 w-full text-center">
              {announcement !== undefined ? '공지사항 수정' : '공지사항 추가'}
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
            <DefaultButton
              text="취소하기"
              activeTheme="black"
              onClick={handleClickCancel}
            />
            <DefaultButton text="저장하기" onClick={handleClickSave} />
          </div>
        </div>
      </BottomSheet>

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
    </>
  );
};

export default AddNoticeBottomSheet;
