import BottomSheet from '@/components/common/BottomSheet';
import { SetStateAction, useState } from 'react';
import { SellerModal } from '@/components';
import { useDeleteAnnouncement } from '@/services/announcement/mutation/useDeleteAnnouncement';
import { usePatchAnnouncement } from '@/services/announcement/mutation/usePatchAnnouncement';
import { AnnouncementType } from '@/types/common/AnnouncementType.types';
import { useSnackbarStore } from '@/store/snackbarStore';

const EditAnnouncementBottomSheet = ({
  announcement,
  isPrimary,
  isOpen,
  setIsOpen,
  setIsEditAnnouncementOpen,
}: {
  announcement: AnnouncementType;
  isOpen: boolean;
  isPrimary: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsEditAnnouncementOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isUnpinModalOpen, setIsUnpinModalOpen] = useState<boolean>(false);
  const [isAnnouncementDeleteModalOpen, setIsAnnouncementDeleteModalOpen] =
    useState<boolean>(false);

  const { showSnackbar } = useSnackbarStore();

  const { mutate: patchAnnouncement } = usePatchAnnouncement(() =>
    showSnackbar('변경사항이 저장되었습니다.')
  );

  // 핀 고정 해제
  const handlePin = () => {
    if (isPrimary)
      setIsUnpinModalOpen(true); // 핀 고정 해제 모달
    else {
      // 핀 고정 연동
      patchAnnouncement({ announcementId: announcement.id, isPrimary: true });
      setIsOpen(false);
    }
  };

  // 핀 고정 해제 모달 -> 확인
  const handleUnpinConfirm = () => {
    patchAnnouncement({ announcementId: announcement.id, isPrimary: false });
    setIsUnpinModalOpen(false);
    setIsOpen(false);
  };

  // 핀 고정 해제 모달 -> 취소
  const handleUnpinModalClose = () => {
    setIsUnpinModalOpen(false);
    setIsOpen(false);
  };

  const handleEditAnnouncement = () => {
    setIsEditAnnouncementOpen(true);
    setIsOpen(false);
  };

  // 공지 삭제
  const handleDeleteAnnouncement = () => {
    setIsAnnouncementDeleteModalOpen(true);
  };

  const { mutate: deleteAnnouncement } = useDeleteAnnouncement(() =>
    showSnackbar('변경사항이 저장되었습니다.')
  );

  // 공지 삭제 모달 -> 확인
  const handleDeleteAnnouncementConfirm = () => {
    setIsAnnouncementDeleteModalOpen(false);
    setIsOpen(false);
    deleteAnnouncement({ announcementId: announcement.id });
  };

  // 공지 삭제 모달 -> 취소
  const handleDeleteAnnouncementCancel = () => {
    setIsAnnouncementDeleteModalOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {!isUnpinModalOpen && !isAnnouncementDeleteModalOpen && (
        <BottomSheet
          onClose={() => setIsOpen(false)}
          isBottomSheetOpen={isOpen}
        >
          <div className="divide-grey02 flex flex-col items-center divide-y px-5 pb-4">
            <button
              type="button"
              className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
              onClick={handlePin}
            >
              {isPrimary ? '상단고정해제' : '상단고정하기'}
            </button>
            <button
              type="button"
              className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
              onClick={handleEditAnnouncement}
            >
              수정
            </button>
            <button
              type="button"
              className="body1-b text-error w-full cursor-pointer py-4 text-center"
              onClick={handleDeleteAnnouncement}
            >
              삭제
            </button>
          </div>
        </BottomSheet>
      )}

      {/* 고정 해제 모달  */}
      {isUnpinModalOpen && (
        <SellerModal
          text="고정을 해제하시겠습니까?"
          description={`가장 최신 공지사항이 자동으로 상단고정되며,\n프로필 홈에 보여집니다.`}
          leftButtonClick={handleUnpinModalClose}
          rightButtonClick={handleUnpinConfirm}
          onClose={handleUnpinModalClose}
          setIsModalOpen={setIsUnpinModalOpen}
        />
      )}
      {/* 공지 삭제 모달  */}
      {isAnnouncementDeleteModalOpen && (
        <SellerModal
          text="공지사항을 삭제하시겠습니까?"
          leftButtonClick={handleDeleteAnnouncementCancel}
          rightButtonClick={handleDeleteAnnouncementConfirm}
          onClose={handleDeleteAnnouncementCancel}
          setIsModalOpen={setIsAnnouncementDeleteModalOpen}
        />
      )}
    </>
  );
};

export default EditAnnouncementBottomSheet;
