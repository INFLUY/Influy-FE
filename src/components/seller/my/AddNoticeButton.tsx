import PlusIcon from '@/assets/icon/common/PlusIcon.svg?react';

const AddNoticeButton = ({
  handleAddNoticeClick,
}: {
  handleAddNoticeClick: () => void;
}) => {
  return (
    <button
      className="border-grey03 text-grey07 mx-5 flex h-fit w-[calc(100%-2.5rem)] cursor-pointer justify-center gap-1 border px-5 py-[.875rem] text-center"
      onClick={handleAddNoticeClick}
    >
      <PlusIcon className="h-5 w-5" />
      <span className="body2-m">추가하기</span>
    </button>
  );
};

export default AddNoticeButton;
