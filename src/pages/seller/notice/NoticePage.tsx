import {
  AddButton,
  AddNoticeBottomSheet,
  EditNoticeBottomSheet,
  LoadingSpinner,
  Notice,
  PageHeader,
} from '@/components';
import { useRef, useState } from 'react';
import { NoticeType } from '@/types/common/NoticeType.types';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useGetNotification } from '@/services/notification/query/useGetNotification';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import NoticeIcon from '@/assets/icon/seller/NoticeIcon.svg?react';
import { useStrictId } from '@/hooks/auth/useStrictId';

const NoticePage = () => {
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState<boolean>(false);
  const [isAdminNoticeOpen, setIsAdminNoticeOpen] = useState<boolean>(false);
  const [isEditNoticeOpen, setIsEditNoticeOpen] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeType | null>(null);
  const [isSelectedNoticePrimary, setIsSelectedNoticePrimary] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const { sellerId } = useStrictId();
  const {
    data: notices,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotification(sellerId!);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const handleEditNotice = (announcement: NoticeType) => {
    setSelectedNotice(announcement);
    setIsSelectedNoticePrimary(announcement.isPrimary);
    setIsAdminNoticeOpen(true);
  };

  const primaryNotice = notices?.pages
    ?.flatMap((p) => p?.announcements)
    ?.find((notice: NoticeType) => notice?.isPrimary);
  const otherNotices = notices?.pages
    ?.flatMap((p) => p?.announcements)
    ?.filter((notice: NoticeType) => !notice?.isPrimary);

  return (
    <div className="flex h-full w-full flex-1 flex-col pt-11">
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
      {notices?.pages[0]?.totalElements === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-5">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <NoticeIcon className="text-grey03" />
            <div className="body1-sb">아직 공지사항이 없어요</div>
          </div>
          <AddButton handleOnClick={() => setIsAddNoticeOpen(true)} size="base">
            추가하기
          </AddButton>
        </div>
      )}
      {notices && notices?.pages[0]?.totalElements > 0 && (
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
          <div className="flex w-full px-5">
            <AddButton
              handleOnClick={() => setIsAddNoticeOpen(true)}
              size="base"
            >
              추가하기
            </AddButton>
          </div>
        </div>
      )}
      {isAddNoticeOpen && (
        <AddNoticeBottomSheet
          isOpen={isAddNoticeOpen}
          setIsOpen={setIsAddNoticeOpen}
        />
      )}
      {isAdminNoticeOpen && selectedNotice !== null && (
        <EditNoticeBottomSheet
          announcement={selectedNotice}
          isPrimary={isSelectedNoticePrimary}
          isOpen={isAdminNoticeOpen}
          setIsOpen={setIsAdminNoticeOpen}
          setIsEditNoticeOpen={setIsEditNoticeOpen}
        />
      )}
      {isEditNoticeOpen && selectedNotice !== null && (
        <AddNoticeBottomSheet
          announcement={selectedNotice}
          isOpen={isEditNoticeOpen}
          setIsOpen={setIsEditNoticeOpen}
        />
      )}
    </div>
  );
};

export default NoticePage;
