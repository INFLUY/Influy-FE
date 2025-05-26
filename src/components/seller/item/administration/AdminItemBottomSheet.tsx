import BottomSheet from '@/components/common/BottomSheet';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerModal from '../../common/SellerModal';
import SnackBar from '@/components/common/SnackBar';

const AdminItemBottomSheet = ({
  itemId,
  isOpen,
  setIsOpen,
}: {
  itemId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [isItemDeleteModalOpen, setIsItemDeleteModalOpen] =
    useState<boolean>(false);
  const [isItemDeletedSnackBarOpen, setIsItemDeletedSnackBarOpen] =
    useState<boolean>(false);
  const [isItemStoredSnackBarOpen, setIsItemStoredSnackBarOpen] =
    useState<boolean>(false);

  // 상품 수정
  const handleItemEdit = () => {
    // itemId 이용하여 navigate
    navigate('');
  };

  // 상품 보관
  const handleItemStore = () => {
    // itemId 이용하여 보관
    setIsItemStoredSnackBarOpen(true); // 스낵바
  };

  const handleStoredSnackBarClose = () => {
    setIsItemStoredSnackBarOpen(false);
    setIsOpen(false);
  };

  // 상품 삭제
  const handleItemDelete = () => {
    setIsItemDeleteModalOpen(true); // 삭제 모달
  };

  // 상품 삭제 모달 확인 버튼 클릭 시
  const handleItemDeleteConfirm = () => {
    // 삭제 로직 연동 -> 삭제 버튼 클릭 시 itemId 이용하여 삭제
    setIsItemDeleteModalOpen(false);
    setIsItemDeletedSnackBarOpen(true); // 스낵바
  };

  // 상품 삭제 모달 닫기
  const handleDeleteModalClose = () => {
    setIsItemDeleteModalOpen(false);
    setIsOpen(false);
  };

  // 스낵바 닫을 때 bottom sheet도 닫아줘야함
  const handleDeletedSnackBarClose = () => {
    setIsItemDeletedSnackBarOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {!isItemDeleteModalOpen &&
        !isItemStoredSnackBarOpen &&
        !isItemDeletedSnackBarOpen && (
          <BottomSheet
            onClose={() => setIsOpen(false)}
            isBottomSheetOpen={isOpen}
          >
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
                onClick={handleItemDelete}
              >
                삭제
              </button>
            </div>
          </BottomSheet>
        )}

      {/* 상품 상태  */}
      {isItemDeleteModalOpen && (
        <SellerModal
          text={`상품을 삭제하시겠습니까?\n한 번 삭제한 상품은 되돌릴 수 없습니다.`}
          rightButtonClick={handleItemDeleteConfirm}
          onClose={handleDeleteModalClose}
          setIsModalOpen={setIsItemDeleteModalOpen}
        />
      )}

      {/* 스낵바 */}
      {isItemStoredSnackBarOpen && (
        <SnackBar handleSnackBarClose={handleStoredSnackBarClose}>
          상품이 보관함으로 이동했습니다.
        </SnackBar>
      )}
      {isItemDeletedSnackBarOpen && (
        <SnackBar handleSnackBarClose={handleDeletedSnackBarClose}>
          상품이 삭제되었습니다.
        </SnackBar>
      )}
    </>
  );
};

export default AdminItemBottomSheet;
