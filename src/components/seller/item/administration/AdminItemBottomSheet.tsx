import BottomSheet from '@/components/common/BottomSheet';
import { generatePath, useNavigate } from 'react-router-dom';
import { SELLER_ITEM_EDIT_PATH } from '@/utils/generatePath';
import { useModalStore } from '@/store/useModalStore';
import { useSnackbarStore } from '@/store/snackbarStore';

const AdminItemBottomSheet = ({
  itemId,
  closeModal,
}: {
  itemId: number;
  closeModal: () => void;
}) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();

  // 상품 수정
  const handleItemEdit = () => {
    closeModal();
    navigate(generatePath(SELLER_ITEM_EDIT_PATH, { itemId }));
  };

  // 상품 보관
  const handleItemStore = () => {
    // itemId 이용하여 보관
    closeModal();
    showSnackbar('상품이 보관함으로 이동했습니다.');
  };

  // 상품 삭제 모달 -> 확인
  const handleItemDeleteConfirm = () => {
    // TODO: 삭제 로직 연동 -> 삭제 버튼 클릭 시 itemId 이용하여 삭제
    hideModal();
    closeModal();
    showSnackbar('상품이 삭제되었습니다.');
  };

  const { showModal, hideModal } = useModalStore();

  // 삭제 모달
  const handleDeleteAccountClick = () => {
    showModal({
      text: `상품을 삭제하시겠습니까?\n한 번 삭제한 상품은 되돌릴 수 없습니다.`,
      leftButtonClick: () => {
        hideModal();
        closeModal();
      },
      rightButtonClick: () => handleItemDeleteConfirm(),
    });
  };

  return (
    <>
      <BottomSheet onClose={closeModal} isBottomSheetOpen>
        <div className="divide-grey02 flex flex-col items-center divide-y px-5 pb-4">
          <button
            type="button"
            className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
            onClick={handleItemEdit}
          >
            상품 수정
          </button>
          <button
            type="button"
            className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
            onClick={handleItemStore}
          >
            보관
          </button>
          <button
            type="button"
            className="body1-b text-error w-full cursor-pointer py-4 text-center"
            onClick={handleDeleteAccountClick}
          >
            삭제
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

export default AdminItemBottomSheet;
