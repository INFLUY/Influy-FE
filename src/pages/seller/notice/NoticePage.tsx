import { AddNoticeBottomSheet, PageHeader } from '@/components';
import PlusIcon from '@/assets/icon/common/PlusIcon.svg?react';
import { useState } from 'react';

const NoticePage = () => {
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState<boolean>(false);
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <PageHeader>공지사항 편집</PageHeader>
      <div className="flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="bg-grey03 h-[5.6875rem] w-[8.0625rem]" />
          <div className="body1-sb">아직 공지사항이 없어요</div>
        </div>
        <button
          className="border-grey03 text-grey07 mx-5 flex h-fit w-[calc(100%-1.25rem)] cursor-pointer justify-center gap-1 border px-5 py-[.875rem] text-center"
          onClick={() => setIsAddNoticeOpen(true)}
        >
          <PlusIcon className="h-5 w-5" />
          <span className="body2-m">추가하기</span>
        </button>
      </div>
      {isAddNoticeOpen && (
        <AddNoticeBottomSheet
          isOpen={isAddNoticeOpen}
          setIsOpen={setIsAddNoticeOpen}
        />
      )}
    </div>
  );
};

export default NoticePage;
