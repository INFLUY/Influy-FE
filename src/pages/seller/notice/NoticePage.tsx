import { PageHeader } from '@/components';
import PlusIcon from '@/assets/icon/common/PlusIcon.svg?react';

const NoticePage = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <PageHeader>공지사항 편집</PageHeader>
      <div className="flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="bg-grey03 h-[5.6875rem] w-[8.0625rem]" />
          <div className="body1-sb">아직 공지사항이 없어요</div>
        </div>
        <button className="border-grey03 text-grey07 body2-m m-5 flex w-[calc(100%-1.25rem)] cursor-pointer justify-center gap-1 border px-5 py-[.875rem] text-center">
          <PlusIcon className="text-grey07 h-5 w-5" />
          <span>추가하기</span>
        </button>
      </div>
    </div>
  );
};

export default NoticePage;
