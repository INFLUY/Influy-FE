import BottomSheet from '@/components/common/BottomSheet';
import { generatePath, useNavigate } from 'react-router-dom';
import { SELLER_ITEM_EDIT_PATH } from '@/utils/generatePath';
import { useModalStore } from '@/store/useModalStore';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useDeleteItem } from '@/services/sellerItem/mutation/useDeleteItem';
import { usePatchItemArchiveStatus } from '@/services/sellerItem/mutation/usePatchItemArchiveStatus';

const AdminItemBottomSheet = ({
  isStored = false,
  itemId,
  closeModal,
}: {
  isStored?: boolean;
  itemId: number;
  closeModal: () => void;
}) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();

  const { mutate: deleteItem } = useDeleteItem(() => {
    hideModal();
    closeModal();
    showSnackbar('상품이 삭제되었습니다.');
  });

  // 상품 수정
  const handleItemEdit = () => {
    closeModal();
    navigate(generatePath(SELLER_ITEM_EDIT_PATH, { itemId }));
  };

  const { mutate: patchItemArchivedStatus } = usePatchItemArchiveStatus(() => {
    closeModal();
    showSnackbar('상품이 보관함으로 이동했습니다.');
  });

  const { showModal, hideModal } = useModalStore();

  // 삭제 모달
  const handleDeleteAccountClick = () => {
    showModal({
      text: `상품을 삭제하시겠습니까?\n한 번 삭제한 상품은 되돌릴 수 없습니다.`,
      leftButtonClick: () => {
        hideModal();
        closeModal();
      },
      rightButtonClick: () => deleteItem({ itemId }),
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
          {!isStored && (
            <button
              type="button"
              className="body1-b text-grey10 w-full cursor-pointer py-4 text-center"
              onClick={() =>
                patchItemArchivedStatus({ itemId, isArchived: true })
              }
            >
              보관
            </button>
          )}
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
