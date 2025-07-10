//폴더 이미지와 '아직 카테고리가 없습니다' 글 있는 화면
import FolderIcon from '@/assets/icon/seller/FolderIcon.svg?react';
import { AddButton } from '@/components';

const EmptyCategoryPlaceholder = ({
  openAddSheet,
}: {
  openAddSheet: () => void;
}) => {
  return (
    <section className="box-border flex h-full w-full flex-col items-center justify-center gap-[1.375rem] px-5">
      {/* 폴더 이미지 및 카테고리 없음 */}
      <div className="flex flex-col items-center">
        <FolderIcon className="h-20 w-[5.6875rem]" />
        <span className="body1-sb mt-6 text-black">아직 카테고리가 없어요</span>
        <span className="caption-m text-grey07 mt-2 w-[16.8125rem] text-center">
          자주 묻는 질문, 재고/수량, 이벤트, 진행 일정, 배송 일정, 후기 모음,
          제작 과정 등의 카테고리를 추가해보세요.
        </span>
      </div>

      {/* 카테고리 추가하기 버튼 */}
      <AddButton handleOnClick={openAddSheet}>카테고리 추가하기</AddButton>
    </section>
  );
};

export default EmptyCategoryPlaceholder;
