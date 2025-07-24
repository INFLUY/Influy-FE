import { lazy, ReactNode, Suspense, useState } from 'react';
import { Tab, Tabs } from '@/components/common/Tab';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ExternalLinkChip,
  NoticeBanner,
  SellerProfileCard,
  SellerProfileHeader,
} from '@/components';
import { useGetPrimaryNotification } from '@/services/notification/query/useGetPrimaryNotification';
import InstagramIcon from '@/assets/icon/common/sns/InstagramIcon.svg?react';
import YoutubeIcon from '@/assets/icon/common/sns/YoutubeIcon.svg?react';
import TiktokIcon from '@/assets/icon/common/sns/TiktokIcon.svg?react';
import EmailIcon from '@/assets/icon/common/sns/EmailIcon.svg?react';

const SellerNoticeBottomSheet = lazy(
  () => import('@/components/user/seller/SellerNoticeBottomSheet')
);

const SellerProfile = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { marketId } = useParams();

  const TABS = [
    {
      id: 0,
      name: 'SELECTION',
      path: `${PATH.MARKET.BASE}/${marketId}/${PATH.MARKET.DETAIL.TABS.SELECTION}`,
    },
    {
      id: 2,
      name: 'REVIEW',
      path: `${PATH.MARKET.BASE}/${marketId}/${PATH.MARKET.DETAIL.TABS.REVIEW}`,
    },
  ];

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 임시 링크
  const LINKS = [
    { id: 0, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 1, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 2, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 3, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
  ];

  const { data: primaryNotice } = useGetPrimaryNotification({
    sellerId: Number(marketId!),
  });

  const sns: { id: number; ariaLabel: string; url: string; icon: ReactNode }[] =
    [
      {
        id: 0,
        ariaLabel: ' 인스타그램 계정 바로가기',
        url: 'https://instagram.com/influy_official',
        icon: <InstagramIcon />,
      },
      {
        id: 1,
        ariaLabel: ' 유튜브 계정 바로가기',
        url: 'https://www.youtube.com',
        icon: <YoutubeIcon />,
      },
      {
        id: 2,
        ariaLabel: ' 틱톡 계정 바로가기',
        url: 'https://www.tiktok.com',
        icon: <TiktokIcon />,
      },
      {
        id: 3,
        ariaLabel: '에게 이메일 보내기',
        url: 'https://google.com',
        icon: <EmailIcon />,
      },
    ];

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="realtive flex h-[7.0625rem] w-full flex-col justify-end bg-[#8B8B8D] pb-[.875rem]">
        <SellerProfileHeader name={'소현'} id={'xoyeone_'} />
        <div className="flex shrink-0 items-center justify-end gap-[.625rem] px-5 text-[#F1F1F1CC] opacity-80">
          {sns?.map((s, index) => (
            <a
              key={index}
              href={s.url}
              aria-label={'소현' + s.ariaLabel}
              className="cursor-pointer"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <SellerProfileCard />
      <div className="flex flex-col gap-2">
        {/* 링크 */}
        {LINKS?.length !== 0 && (
          <div className="scrollbar-hide flex items-start gap-[.625rem] self-stretch overflow-x-auto px-5 py-2">
            {LINKS.map((link) => (
              <ExternalLinkChip key={link.id} name={link.name} url={link.url} />
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
        <Suspense fallback={null}>
          {isBottomSheetOpen && (
            <SellerNoticeBottomSheet
              marketId={Number(marketId!)}
              isBottomSheetOpen={isBottomSheetOpen}
              setIsBottomSheetOpen={setIsBottomSheetOpen}
            />
          )}
        </Suspense>
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
