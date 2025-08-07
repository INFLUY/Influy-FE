import {
  AddButton,
  AddAnnouncementBottomSheet,
  EditAnnouncementBottomSheet,
  LoadingSpinner,
  Announcement,
  PageHeader,
} from '@/components';
import { useRef, useState } from 'react';
import { AnnouncementType } from '@/types/common/AnnouncementType.types';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useGetAnnouncement } from '@/services/announcement/query/useGetAnnouncement';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import AnnouncementIcon from '@/assets/icon/seller/AnnouncementIcon.svg?react';
import { useStrictId } from '@/hooks/auth/useStrictId';

const AnnouncementPage = () => {
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] =
    useState<boolean>(false);
  const [isAdminAnnouncementOpen, setIsAdminAnnouncementOpen] =
    useState<boolean>(false);
  const [isEditAnnouncementOpen, setIsEditAnnouncementOpen] =
    useState<boolean>(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType | null>(null);
  const [isSelectedAnnouncementPrimary, setIsSelectedAnnouncementPrimary] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const { sellerId } = useStrictId();
  const {
    data: announcements,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAnnouncement(sellerId!);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const handleEditAnnouncement = (announcement: AnnouncementType) => {
    setSelectedAnnouncement(announcement);
    setIsSelectedAnnouncementPrimary(announcement.isPrimary);
    setIsAdminAnnouncementOpen(true);
  };

  const primaryAnnouncement = announcements?.pages
    ?.flatMap((p) => p?.announcements ?? [])
    ?.find((announcement: AnnouncementType) => announcement?.isPrimary);
  const otherAnnouncements = announcements?.pages
    ?.flatMap((p) => p?.announcements ?? [])
    ?.filter((announcement: AnnouncementType) => !announcement?.isPrimary);

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
      {announcements?.pages[0]?.totalElements === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-5">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <AnnouncementIcon className="text-grey03" />
            <div className="body1-sb">아직 공지사항이 없어요</div>
          </div>
          <AddButton
            handleOnClick={() => setIsAddAnnouncementOpen(true)}
            size="base"
          >
            추가하기
          </AddButton>
        </div>
      )}
      {announcements?.pages[0] &&
        announcements?.pages[0]?.totalElements > 0 && (
          <div className="scrollbar-hide flex h-full w-full flex-col items-center gap-4 overflow-y-auto pt-2 pb-24">
            <ul className="flex w-full flex-col items-center">
              {primaryAnnouncement && (
                <Announcement
                  key={primaryAnnouncement.id}
                  announcement={primaryAnnouncement}
                  handleEditAnnouncement={handleEditAnnouncement}
                />
              )}
              {otherAnnouncements &&
                otherAnnouncements?.map((announcement: AnnouncementType) => (
                  <Announcement
                    key={announcement.id}
                    announcement={announcement}
                    handleEditAnnouncement={handleEditAnnouncement}
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
                handleOnClick={() => setIsAddAnnouncementOpen(true)}
                size="base"
              >
                추가하기
              </AddButton>
            </div>
          </div>
        )}
      {isAddAnnouncementOpen && (
        <AddAnnouncementBottomSheet
          isOpen={isAddAnnouncementOpen}
          setIsOpen={setIsAddAnnouncementOpen}
        />
      )}
      {isAdminAnnouncementOpen && selectedAnnouncement !== null && (
        <EditAnnouncementBottomSheet
          announcement={selectedAnnouncement}
          isPrimary={isSelectedAnnouncementPrimary}
          isOpen={isAdminAnnouncementOpen}
          setIsOpen={setIsAdminAnnouncementOpen}
          setIsEditAnnouncementOpen={setIsEditAnnouncementOpen}
        />
      )}
      {isEditAnnouncementOpen && selectedAnnouncement !== null && (
        <AddAnnouncementBottomSheet
          announcement={selectedAnnouncement}
          isOpen={isEditAnnouncementOpen}
          setIsOpen={setIsEditAnnouncementOpen}
        />
      )}
    </div>
  );
};

export default AnnouncementPage;
