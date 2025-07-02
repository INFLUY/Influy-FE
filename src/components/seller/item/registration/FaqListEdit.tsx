import FolderIcon from '@/assets/icon/seller/FolderIcon.svg?react';
import AddIcon from '@/assets/icon/common/AddIcon.svg?react';

const FaqListEdit = () => {
  return (
    <section className="box-border flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col gap-[1.375rem] px-5">
        {/* 폴더 이미지 및 카테고리 없음 */}
        <div className="flex flex-col items-center">
          <FolderIcon className="h-20 w-[5.6875rem]" />
          <span className="body1-sb mt-6 text-black">
            아직 카테고리가 없어요
          </span>
          <span className="caption-m text-grey07 mt-2 w-[16.8125rem] text-center">
            자주 묻는 질문, 재고/수량, 이벤트, 진행 일정, 배송 일정, 후기 모음,
            제작 과정 등의 카테고리를 추가해보세요.
          </span>
        </div>

        {/* 카테고리 추가하기 버튼 */}
        <button
          className="border-grey03 text-grey07 body2-m flex w-full items-center justify-center gap-1 rounded-xs border-1 py-[14px]"
          type="button"
        >
          <AddIcon className="h-[1.125rem] w-[1.125rem]" />
          카테고리 추가하기
        </button>
      </div>
    </section>
  );
};
export default FaqListEdit;
