import {
  AddNoticeBottomSheet,
  AddNoticeButton,
  PageHeader,
} from '@/components';
import { useState } from 'react';
import { NoticeType } from '@/types/types';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';

const NoticePage = () => {
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState<boolean>(false);

  // 임시 공지사항
  const NOTICES: NoticeType[] = [
    {
      id: 0,
      title: '인플루이 파이팅',
      date: '2025.05.29',
      content: '이스터에그🪺',
    },
    {
      id: 1,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
    },
    {
      id: 1243420,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
    },
    {
      id: 11234,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
    },
    {
      id: 1023142134,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
    },
    {
      id: 121415,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
    },
    {
      id: 1121414334,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
    },
    {
      id: 1023142,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
    },
    {
      id: 1211431415,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
    },
  ];

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <PageHeader>공지사항 편집</PageHeader>
      {NOTICES?.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="bg-grey03 h-[5.6875rem] w-[8.0625rem]" />
            <div className="body1-sb">아직 공지사항이 없어요</div>
          </div>
          <AddNoticeButton
            handleAddNoticeClick={() => setIsAddNoticeOpen(true)}
          />
        </div>
      )}
      {NOTICES?.length > 0 && (
        <div className="scrollbar-hide flex h-full w-full flex-col items-center gap-4 overflow-y-auto pt-2 pb-24">
          <div className="flex w-full flex-col items-center">
            {NOTICES.map((notice) => (
              <div className="border-grey03 flex w-full cursor-pointer flex-col gap-2 border-b px-5 pt-4 pb-5">
                <div className="flex w-full flex-col">
                  <div className="flex w-full justify-between">
                    <h1 className="body1-m">{notice.title}</h1>
                    <KebabIcon className="text-grey08 h-5 w-5 cursor-pointer" />
                  </div>
                  <div className="text-grey05 caption-m">{notice.date}</div>
                </div>
                <div className="body2-r">{notice.content}</div>
              </div>
            ))}
          </div>
          <AddNoticeButton
            handleAddNoticeClick={() => setIsAddNoticeOpen(true)}
          />
        </div>
      )}
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
