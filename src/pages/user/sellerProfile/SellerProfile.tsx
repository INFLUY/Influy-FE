import { ReactNode, useState } from 'react';
import { Tab, Tabs } from '@/components/common/Tab';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ExternalLinkChip,
  NoticeBanner,
  SellerProfileCard,
  SellerProfileHeader,
  BottomSheet,
} from '@/components';
import { NoticeType } from '@/types/common/NoticeType.types';
import { useGetNotification } from '@/state/query/notification/useGetNotification';

const SellerProfile = ({ children }: { children: ReactNode }) => {
  const TABS = [
    { id: 0, name: 'SELECTION', path: PATH.SELLER_PROFILE.tabs.selection },
    { id: 2, name: 'REVIEW', path: PATH.SELLER_PROFILE.tabs.review },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 임시 링크
  const LINKS = [
    { id: 0, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 1, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 2, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 3, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
  ];

  const { marketId } = useParams();
  const { data: NOTICES } = useGetNotification({ sellerId: Number(marketId) });

  const primaryNotice = NOTICES?.announcements?.find(
    (notice: NoticeType) => notice.isPrimary
  );

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="realtive flex h-[7.0625rem] w-full flex-col bg-[#8B8B8D]">
        <SellerProfileHeader name={'소현'} id={'xoyeone_'} />
      </div>
      <SellerProfileCard />
      {/* 공지 */}
      <div className="bg-grey02 flex w-full px-5 py-3">
        <NoticeBanner
          title={primaryNotice?.title}
          count={NOTICES?.announcements?.length}
          onClickNotice={() => setIsBottomSheetOpen(true)}
        />
      </div>
      {isBottomSheetOpen && (
        <BottomSheet
          onClose={() => setIsBottomSheetOpen(false)}
          isBottomSheetOpen={isBottomSheetOpen}
        >
          <div className="flex flex-col items-center gap-7">
            <h1 className="subhead-b text-grey10 w-full text-center">
              공지사항
            </h1>
            <div className="scrollbar-hide flex h-[70vh] flex-col gap-4 overflow-y-auto pb-8">
              {NOTICES?.announcements?.length === 0 ? (
                <div className="flex h-full items-center">
                  <span className="body2-m text-grey06 pb-20">
                    아직 등록된 공지가 없습니다.
                  </span>
                </div>
              ) : (
                NOTICES?.announcements?.map((notice: NoticeType) => (
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
      )}
      <section className="divide-grey02 flex flex-col divide-y-[12px]">
        {/* 링크 */}
        <div className="scrollbar-hide flex items-start gap-[.625rem] self-stretch overflow-x-auto px-5 py-3">
          {LINKS.map((link) => (
            <ExternalLinkChip key={link.id} name={link.name} url={link.url} />
          ))}
        </div>
        {/* 탭 */}
        <Tabs>
          {TABS.map((tab) => (
            <Tab
              key={tab.name}
              handleClickTab={() => navigate(tab.path, { replace: true })}
              isTabActive={pathname.includes(tab.path)}
            >
              {tab.name}
            </Tab>
          ))}
        </Tabs>
        {children}
      </section>
    </div>
  );
};

export default SellerProfile;
