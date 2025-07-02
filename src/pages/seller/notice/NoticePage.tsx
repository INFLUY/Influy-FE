import {
  AddNoticeBottomSheet,
  AddNoticeButton,
  EditNoticeBottomSheet,
  LoadingSpinner,
  Notice,
  PageHeader,
  SnackBar,
} from '@/components';
import { useEffect, useRef, useState } from 'react';
import { NoticeType } from '@/types/common/NoticeType.types';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useGetNotification } from '@/state/query/notification/useGetNotification';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';

const NoticePage = () => {
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState<boolean>(false);
  const [isAdminNoticeOpen, setIsAdminNoticeOpen] = useState<boolean>(false);
  const [isEditNoticeOpen, setIsEditNoticeOpen] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeType | null>(null);
  const [isSelectedNoticePrimary, setIsSelectedNoticePrimary] =
    useState<boolean>(false);
  const [isNoticeSavedSnackBarOpen, setIsNoticeSavedSnackBarOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const sellerId = useStrictSellerId();
  const {
    data: notices,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotification(sellerId);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleEditNotice = (announcement: NoticeType) => {
    setSelectedNotice(announcement);
    setIsSelectedNoticePrimary(announcement.isPrimary);
    setIsAdminNoticeOpen(true);
  };

  const primaryNotice = notices?.announcements?.find(
    (notice: NoticeType) => notice.isPrimary
  );
  const otherNotices = notices?.announcements?.filter(
    (notice: NoticeType) => !notice.isPrimary
  );

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
          />,
        ]}
      >
        공지사항 편집
      </PageHeader>
      {notices?.totalElements === 0 && (
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
      {notices?.totalElements > 0 && (
        <div className="scrollbar-hide flex h-full w-full flex-col items-center gap-4 overflow-y-auto pt-2 pb-24">
          <ul className="flex w-full flex-col items-center">
            {primaryNotice && (
              <Notice
                key={primaryNotice.id}
                notice={primaryNotice}
                handleEditNotice={handleEditNotice}
              />
            )}
            {otherNotices?.map((notice: NoticeType) => (
              <Notice
                key={notice.id}
                notice={notice}
                handleEditNotice={handleEditNotice}
              />
            ))}
          </ul>
          {hasNextPage && (
            <div ref={observerRef} className="h-4 w-full">
              {isFetchingNextPage && (
                <div className="flex justify-center">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          )}
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
          announcement={selectedNotice}
          isPrimary={isSelectedNoticePrimary}
          isOpen={isAdminNoticeOpen}
          setIsOpen={setIsAdminNoticeOpen}
          setIsEditNoticeOpen={setIsEditNoticeOpen}
          setIsNoticeSavedSnackBarOpen={setIsNoticeSavedSnackBarOpen}
        />
      )}
      {isEditNoticeOpen && selectedNotice !== null && (
        <AddNoticeBottomSheet
          announcement={selectedNotice}
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
