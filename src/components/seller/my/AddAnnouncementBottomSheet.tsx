import BottomSheet from '@/components/common/BottomSheet';
import { useState } from 'react';
import {
  DefaultButton,
  SellerModal,
  TextInput,
  WideTextArea,
} from '@/components';
import { usePostAnnouncement } from '@/services/announcement/mutation/usePostAnnouncement';
import { AnnouncementType } from '@/types/common/AnnouncementType.types';
import { usePatchAnnouncement } from '@/services/announcement/mutation/usePatchAnnouncement';
import { useSnackbarStore } from '@/store/snackbarStore';

const AddAnnouncementBottomSheet = ({
  announcement,
  isOpen,
  setIsOpen,
}: {
  announcement?: AnnouncementType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState<string>(announcement?.title || '');
  const [content, setContent] = useState<string>(announcement?.content || '');
  const [isAnnouncementCancelModalOpen, setIsAnnouncementCancelModalOpen] =
    useState<boolean>(false);
  const [
    isAnnouncementEditCancelModalOpen,
    setIsAnnouncementEditCancelModalOpen,
  ] = useState<boolean>(false);

  const { showSnackbar } = useSnackbarStore();

  const { mutate: postAnnouncement } = usePostAnnouncement(() => {
    showSnackbar('변경사항이 저장되었습니다.');
    setIsOpen(false);
  });

  const { mutate: patchAnnouncement } = usePatchAnnouncement(() => {
    showSnackbar('변경사항이 저장되었습니다.');
    setIsOpen(false);
  });

  // 공지 저장(수정)
  const handleClickSave = () => {
    if (!isAnnouncementValid()) {
      if (title.trim() === '') {
        showSnackbar('제목을 작성해주세요.');
      } else {
        showSnackbar('본문을 작성해주세요.');
      }
      return;
    }

    if (announcement) {
      patchAnnouncement({
        data: { title, content },
        announcementId: announcement.id,
      }); // 공지사항 수정
    } else {
      postAnnouncement({ title, content }); // 공지사항 추가
    }
  };

  // 공지 작성 취소
  const handleClickCancel = () => {
    setIsAnnouncementCancelModalOpen(true); // 삭제 모달
  };

  // 공지 작성 취소 모달 -> 취소
  const handleCancelAnnouncementModalClose = () => {
    setIsAnnouncementCancelModalOpen(false);
  };

  // 공지 작성 취소 모달 -> 확인
  const handleAnnouncementCancelConfirm = () => {
    setIsAnnouncementCancelModalOpen(false);
    setIsOpen(false);
  };

  const isAnnouncementValid = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      return true;
    } else {
      return false;
    }
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
              activeTheme="borderGrey"
              onClick={handleClickCancel}
            />
            <DefaultButton text="저장하기" onClick={handleClickSave} />
          </div>
        </div>
      </BottomSheet>

      {/* 공지사항 작성 취소 시 모달  */}
      {isAnnouncementCancelModalOpen && (
        <SellerModal
          text={`작성을 취소하시겠습니까?\n현재 내용은 모두 삭제됩니다.`}
          leftButtonClick={handleCancelAnnouncementModalClose}
          rightButtonClick={handleAnnouncementCancelConfirm}
          onClose={() => setIsAnnouncementCancelModalOpen(false)}
          setIsModalOpen={setIsAnnouncementCancelModalOpen}
        />
      )}

      {/* 공지사항 수정 취소 시 모달  */}
      {isAnnouncementEditCancelModalOpen && (
        <SellerModal
          text={`작성을 취소하시겠습니까?\n수정한 내용은 반영되지 않습니다.`}
          leftButtonClick={handleCancelAnnouncementModalClose}
          rightButtonClick={handleAnnouncementCancelConfirm}
          onClose={() => setIsAnnouncementEditCancelModalOpen(false)}
          setIsModalOpen={setIsAnnouncementEditCancelModalOpen}
        />
      )}
    </>
  );
};

export default AddAnnouncementBottomSheet;
