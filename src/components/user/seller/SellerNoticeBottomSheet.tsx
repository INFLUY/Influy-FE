import BottomSheet from '@/components/common/BottomSheet';
import { useGetNotification } from '@/state/query/notification/useGetNotification';
import { NoticeType } from '@/types/common/NoticeType.types';
import { SetStateAction } from 'react';

const SellerNoticeBottomSheet = ({
  marketId,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}: {
  marketId: number;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: notices } = useGetNotification({ sellerId: Number(marketId) });

  return (
    <BottomSheet
      onClose={() => setIsBottomSheetOpen(false)}
      isBottomSheetOpen={isBottomSheetOpen}
    >
      <div className="flex flex-col items-center gap-7">
        <h1 className="subhead-b text-grey10 w-full text-center">공지사항</h1>
        <div className="scrollbar-hide flex h-[70vh] w-full flex-col gap-4 overflow-y-auto pb-8">
          {notices?.totalElements === 0 ? (
            <div className="flex h-full items-center">
              <span className="body2-m text-grey06 pb-20">
                아직 등록된 공지가 없습니다.
              </span>
            </div>
          ) : (
            notices?.announcements?.map((notice: NoticeType) => (
              <div
                key={notice.id}
                className="border-grey03 flex h-fit w-full flex-col gap-2 border-b px-5 pb-5"
              >
                <div className="flex flex-col">
                  <h2 className="body1-m text-grey10">{notice.title}</h2>
                  <span className="caption-m text-grey05">
                    {notice.createdAt}
                  </span>
                </div>
                <p className="body2-r text-grey09">{notice.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

export default SellerNoticeBottomSheet;
