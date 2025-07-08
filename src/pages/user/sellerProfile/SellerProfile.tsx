import { ReactNode, useState } from 'react';
import { Tab, Tabs } from '@/components/common/Tab';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ExternalLinkChip,
  NoticeBanner,
  SellerProfileCard,
  SellerProfileHeader,
  SellerNoticeBottomSheet,
} from '@/components';
import { useGetPrimaryNotification } from '@/services/notification/query/useGetPrimaryNotification';

const SellerProfile = ({ children }: { children: ReactNode }) => {
  const TABS = [
    { id: 0, name: 'SELECTION', path: PATH.USER.tabs.selection },
    { id: 2, name: 'REVIEW', path: PATH.USER.tabs.review },
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

  const { data: primaryNotice } = useGetPrimaryNotification({
    sellerId: Number(marketId!),
  });

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="realtive flex h-[7.0625rem] w-full flex-col bg-[#8B8B8D]">
        <SellerProfileHeader name={'소현'} id={'xoyeone_'} />
      </div>
      <SellerProfileCard />
      <div className="flex flex-col gap-2">
        <article className="flex flex-col gap-2">
          {/* 링크 */}
          {LINKS?.length !== 0 && (
            <div className="scrollbar-hide flex items-start gap-[.625rem] self-stretch overflow-x-auto px-5 py-2">
              {LINKS.map((link) => (
                <ExternalLinkChip
                  key={link.id}
                  name={link.name}
                  url={link.url}
                />
              ))}
            </div>
          )}
          {/* 공지 */}
          {primaryNotice?.totalAnnouncements !== 0 && (
            <div className="bg-grey01 flex w-full px-5 py-3">
              <NoticeBanner
                title={primaryNotice?.title}
                count={primaryNotice?.totalAnnouncements}
                onClickNotice={() => setIsBottomSheetOpen(true)}
              />
            </div>
          )}
        </article>
        {isBottomSheetOpen && (
          <SellerNoticeBottomSheet
            marketId={Number(marketId!)}
            isBottomSheetOpen={isBottomSheetOpen}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
          />
        )}
        <section className="flex flex-col">
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
    </div>
  );
};

export default SellerProfile;
