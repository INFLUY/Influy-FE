import BottomSheet from '@/components/common/BottomSheet';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // 상품 수정
  const handleItemEdit = () => {
    // itemId 이용하여 navigate
    navigate('');
  };

  // 상품 보관
  const handleItemStore = () => {
    // itemId 이용하여 보관
    setIsOpen(false);
    // 스낵바
  };

  // 상품 삭제
  const handleItemDelete = () => {
    setIsOpen(false);
    // 삭제 모달
    // 삭제 모달 -> 삭제 버튼 클릭 시 itemId 이용하여 삭제
  };

  return (
    <BottomSheet onClose={() => setIsOpen(false)} isBottomSheetOpen={isOpen}>
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
  );
};

export default AdminItemBottomSheet;
