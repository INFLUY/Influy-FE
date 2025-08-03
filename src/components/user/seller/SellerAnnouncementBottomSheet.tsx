import BottomSheet from '@/components/common/BottomSheet';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetAnnouncement } from '@/services/announcement/query/useGetAnnouncement';
import { AnnouncementType } from '@/types/common/AnnouncementType.types';
import { parseDateString } from '@/utils/formatDate';
import { SetStateAction, useRef } from 'react';
import PinIcon from '@/assets/icon/user/PinIcon.svg?react';

const SellerAnnouncementBottomSheet = ({
  marketId,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}: {
  marketId: number;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    data: announcements,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAnnouncement(marketId);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const primaryAnnouncement = announcements?.pages
    ?.flatMap((p) => p?.announcements ?? [])
    ?.find((announcement: AnnouncementType) => announcement?.isPrimary);
  const otherAnnouncements = announcements?.pages
    ?.flatMap((p) => p?.announcements ?? [])
    ?.filter((announcement: AnnouncementType) => !announcement?.isPrimary);

  return (
    <BottomSheet
      onClose={() => setIsBottomSheetOpen(false)}
      isBottomSheetOpen={isBottomSheetOpen}
    >
      <div className="flex flex-col items-center gap-7">
        <h1 className="subhead-b text-grey10 w-full text-center">공지사항</h1>
        <div className="scrollbar-hide flex h-[70vh] w-full flex-col gap-4 overflow-y-auto pb-8">
          {announcements?.pages[0]?.totalElements === 0 ? (
            <div className="flex h-full w-full items-center justify-center">
              <span className="body2-m text-grey06 flex items-center pb-20 text-center">
                아직 등록된 공지가 없습니다.
              </span>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {primaryAnnouncement && (
                <li
                  key={primaryAnnouncement.id}
                  className="border-grey03 flex h-fit w-full flex-col gap-2 border-b px-5 pb-5"
                >
                  <div className="flex flex-col">
                    <span className="flex justify-between">
                      <h2 className="body1-m text-grey10">
                        {primaryAnnouncement.title}
                      </h2>
                      <PinIcon className="h-6 w-6 shrink-0 text-black" />
                    </span>
                    <span className="caption-m text-grey05">
                      {parseDateString(primaryAnnouncement.createdAt)}
                    </span>
                  </div>
                  <p className="body2-r text-grey09">
                    {primaryAnnouncement.content}
                  </p>
                </li>
              )}
              {otherAnnouncements?.map((announcement: AnnouncementType) => (
                <li
                  key={announcement.id}
                  className="border-grey03 flex h-fit w-full flex-col gap-2 border-b px-5 pb-5"
                >
                  <div className="flex flex-col">
                    <h2 className="body1-m text-grey10">
                      {announcement.title}
                    </h2>
                    <span className="caption-m text-grey05">
                      {parseDateString(announcement.createdAt)}
                    </span>
                  </div>
                  <p className="body2-r text-grey09">{announcement.content}</p>
                </li>
              ))}
            </ul>
          )}
          {hasNextPage && (
            <div ref={observerRef} className="h-4 w-full">
              {isFetchingNextPage && (
                <div className="flex justify-center">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

export default SellerAnnouncementBottomSheet;
