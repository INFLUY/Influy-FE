import {
  AddNoticeBottomSheet,
  AddNoticeButton,
  EditNoticeBottomSheet,
  PageHeader,
  SnackBar,
} from '@/components';
import { useState } from 'react';
import { NoticeType } from '@/types/types';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';
import PinIcon from '@/assets/icon/common/DarkPinIcon.svg?react';

const NoticePage = () => {
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState<boolean>(false);
  const [isAdminNoticeOpen, setIsAdminNoticeOpen] = useState<boolean>(false);
  const [isEditNoticeOpen, setIsEditNoticeOpen] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);
  const [isSelectedNoticePrimary, setIsSelectedNoticePrimary] =
    useState<boolean>(false);
  const [isNoticeSavedSnackBarOpen, setIsNoticeSavedSnackBarOpen] =
    useState<boolean>(false);

  // 임시 공지사항
  const NOTICES: NoticeType[] = [
    {
      id: 0,
      title: '인플루이 파이팅',
      date: '2025.05.29',
      content: '이스터에그🪺',
      isPrimary: true,
    },
    {
      id: 1,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
      isPrimary: false,
    },
    {
      id: 1243420,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
      isPrimary: false,
    },
    {
      id: 11234,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
      isPrimary: false,
    },
    {
      id: 1023142134,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
      isPrimary: false,
    },
    {
      id: 121415,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
      isPrimary: false,
    },
    {
      id: 1121414334,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
      isPrimary: false,
    },
    {
      id: 1023142,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
      isPrimary: false,
    },
    {
      id: 1211431415,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
      isPrimary: false,
    },
  ];

  const handleEditNotice = (noticeId: number, isPrimary: boolean) => {
    setSelectedNotice(noticeId);
    setIsSelectedNoticePrimary(isPrimary);
    setIsAdminNoticeOpen(true);
    console.log(noticeId);
  };

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
              <div
                key={notice.id}
                className="border-grey03 flex w-full cursor-pointer flex-col gap-2 border-b px-5 pt-4 pb-5"
              >
                <div className="flex w-full flex-col">
                  <div className="flex w-full justify-between">
                    <h1 className="body1-m">{notice.title}</h1>
                    <div className="flex items-center gap-[.125rem]">
                      {notice?.isPrimary && (
                        <PinIcon className="h-6 w-6 text-black" />
                      )}
                      <KebabIcon
                        className="text-grey08 h-5 w-5 cursor-pointer"
                        onClick={() =>
                          handleEditNotice(notice.id, notice.isPrimary)
                        }
                      />
                    </div>
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
          setIsNoticeSavedSnackBarOpen={setIsNoticeSavedSnackBarOpen}
        />
      )}
      {isAdminNoticeOpen && selectedNotice !== null && (
        <EditNoticeBottomSheet
          noticeId={selectedNotice}
          isPrimary={isSelectedNoticePrimary}
          isOpen={isAdminNoticeOpen}
          setIsOpen={setIsAdminNoticeOpen}
          setIsEditNoticeOpen={setIsEditNoticeOpen}
          setIsNoticeSavedSnackBarOpen={setIsNoticeSavedSnackBarOpen}
        />
      )}
      {isEditNoticeOpen && selectedNotice !== null && (
        <AddNoticeBottomSheet
          noticeId={selectedNotice}
          isOpen={isEditNoticeOpen}
          setIsOpen={setIsEditNoticeOpen}
          setIsNoticeSavedSnackBarOpen={setIsNoticeSavedSnackBarOpen}
        />
      )}
      {/* 스낵바 */}
      {isNoticeSavedSnackBarOpen && (
        <SnackBar
          handleSnackBarClose={() => setIsNoticeSavedSnackBarOpen(false)}
        >
          변경사항이 저장되었습니다.
        </SnackBar>
      )}
    </div>
  );
};

export default NoticePage;
