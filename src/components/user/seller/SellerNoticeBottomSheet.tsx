import BottomSheet from '@/components/common/BottomSheet';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetNotification } from '@/services/notification/query/useGetNotification';
import { NoticeType } from '@/types/common/NoticeType.types';
import { parseDateString } from '@/utils/formatDate';
import { SetStateAction, useRef } from 'react';
import PinIcon from '@/assets/icon/user/PinIcon.svg?react';

const SellerNoticeBottomSheet = ({
  marketId,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}: {
  marketId: number;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    data: notices,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotification(marketId);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const primaryNotice = notices?.pages
    ?.flatMap((p) => p?.announcements)
    ?.find((notice: NoticeType) => notice?.isPrimary);
  const otherNotices = notices?.pages
    ?.flatMap((p) => p?.announcements)
    ?.filter((notice: NoticeType) => !notice?.isPrimary);

  return (
    <BottomSheet
      onClose={() => setIsBottomSheetOpen(false)}
      isBottomSheetOpen={isBottomSheetOpen}
    >
      <div className="flex flex-col items-center gap-7">
        <h1 className="subhead-b text-grey10 w-full text-center">공지사항</h1>
        <div className="scrollbar-hide flex h-[70vh] w-full flex-col gap-4 overflow-y-auto pb-8">
          {notices?.pages[0]?.totalElements === 0 ? (
            <div className="flex h-full w-full items-center justify-center">
              <span className="body2-m text-grey06 flex items-center pb-20 text-center">
                아직 등록된 공지가 없습니다.
              </span>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {primaryNotice && (
                <li
                  key={primaryNotice.id}
                  className="border-grey03 flex h-fit w-full flex-col gap-2 border-b px-5 pb-5"
                >
                  <div className="flex flex-col">
                    <span className="flex justify-between">
                      <h2 className="body1-m text-grey10">
                        {primaryNotice.title}
                      </h2>
                      <PinIcon className="h-6 w-6 shrink-0 text-black" />
                    </span>
                    <span className="caption-m text-grey05">
                      {parseDateString(primaryNotice.createdAt)}
                    </span>
                  </div>
                  <p className="body2-r text-grey09">{primaryNotice.content}</p>
                </li>
              )}
              {otherNotices?.map((notice: NoticeType) => (
                <li
                  key={notice.id}
                  className="border-grey03 flex h-fit w-full flex-col gap-2 border-b px-5 pb-5"
                >
                  <div className="flex flex-col">
                    <h2 className="body1-m text-grey10">{notice.title}</h2>
                    <span className="caption-m text-grey05">
                      {parseDateString(notice.createdAt)}
                    </span>
                  </div>
                  <p className="body2-r text-grey09">{notice.content}</p>
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

export default SellerNoticeBottomSheet;
