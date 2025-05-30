import BottomSheet from '@/components/common/BottomSheet';
import { SetStateAction, useState } from 'react';
import { SellerModal } from '@/components';

const EditNoticeBottomSheet = ({
  noticeId,
  isOpen,
  setIsOpen,
  setIsEditNoticeOpen,
  setIsNoticeSavedSnackBarOpen,
}: {
  noticeId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsEditNoticeOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsNoticeSavedSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isUnpinModalOpen, setIsUnpinModalOpen] = useState<boolean>(false);
  const [isNoticeDeleteModalOpen, setIsNoticeDeleteModalOpen] =
    useState<boolean>(false);

  // 핀 고정 해제
  const handleUnpin = () => {
    setIsUnpinModalOpen(true); // 삭제 모달
  };

  // 핀 고정 해제 모달 -> 확인
  const handleUnpinConfirm = () => {
    // 삭제 로직 연동 -> 삭제 버튼 클릭 시 itemId 이용하여 삭제
    console.log(noticeId);
    setIsUnpinModalOpen(false);
    setIsOpen(false);
    setIsNoticeSavedSnackBarOpen(true); // 스낵바
  };

  // 핀 고정 해제 모달 -> 취소
  const handleUnpinModalClose = () => {
    setIsUnpinModalOpen(false);
    setIsOpen(false);
  };

  const handleEditNotice = () => {
    setIsEditNoticeOpen(true);
    setIsOpen(false);
  };

  // 공지 삭제
  const handleDeleteNotice = () => {
    setIsNoticeDeleteModalOpen(true);
  };

  // 공지 삭제 모달 -> 확인
  const handleDeleteNoticeConfirm = () => {
    setIsNoticeDeleteModalOpen(false);
    setIsOpen(false);
    setIsNoticeSavedSnackBarOpen(true);
  };

  // 공지 삭제 모달 -> 취소
  const handleDeleteNoticeCancel = () => {
    setIsNoticeDeleteModalOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {!isUnpinModalOpen && !isNoticeDeleteModalOpen && (
        <BottomSheet
          onClose={() => setIsOpen(false)}
          isBottomSheetOpen={isOpen}
        >
          <div className="divide-grey02 flex flex-col items-center divide-y px-5 pb-4">
            <button
              type="button"
              className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
              onClick={handleUnpin}
            >
              상단 고정하기
            </button>
            <button
              type="button"
              className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
              onClick={handleEditNotice}
            >
              수정
            </button>
            <button
              type="button"
              className="body1-b text-error w-full cursor-pointer py-4 text-center"
              onClick={handleDeleteNotice}
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
      {isNoticeDeleteModalOpen && (
        <SellerModal
          text="공지사항을 삭제하시겠습니까?"
          leftButtonClick={handleDeleteNoticeCancel}
          rightButtonClick={handleDeleteNoticeConfirm}
          onClose={handleDeleteNoticeCancel}
          setIsModalOpen={setIsNoticeDeleteModalOpen}
        />
      )}
    </>
  );
};

export default EditNoticeBottomSheet;
