import { lazy, ReactNode, Suspense, useState } from 'react';
import { Tab, Tabs } from '@/components/common/Tab';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ExternalLinkChip,
  NoticeBanner,
  PageHeader,
  SellerProfileCard,
  SellerProfileHeader,
} from '@/components';
import { useGetPrimaryNotification } from '@/services/notification/query/useGetPrimaryNotification';
import InstagramIcon from '@/assets/icon/common/sns/InstagramIcon.svg?react';
import YoutubeIcon from '@/assets/icon/common/sns/YoutubeIcon.svg?react';
import TiktokIcon from '@/assets/icon/common/sns/TiktokIcon.svg?react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import EmailIcon from '@/assets/icon/common/sns/EmailIcon.svg?react';
import { LinkType } from '@/types/seller/LinkType.types';
import { useGetMarketLinks } from '@/services/marketLinks/query/useGetMarketLinks';
import { useStrictId } from '@/hooks/auth/useStrictId';
import {
  SellerMarketType,
  SellerMyMarketType,
} from '@/types/seller/SellerProfile.types';
import {
  useGetMarket,
  useGetMyMarket,
} from '@/services/seller/query/useGetMarket';

const SellerNoticeBottomSheet = lazy(
  () => import('@/components/user/seller/SellerNoticeBottomSheet')
);

const SellerProfilePage = ({ children }: { children: ReactNode }) => {
  const { marketId } = useParams();

  if (marketId) {
    return <UserView>{children}</UserView>;
  }

  return <SellerView>{children}</SellerView>;
};

const UserView = ({ children }: { children: ReactNode }) => {
  const { marketId } = useParams();
  const { data: marketData } = useGetMarket({ sellerId: Number(marketId) });

  if (marketId && marketData) {
    return (
      <SellerProfile marketId={Number(marketId)} marketInfo={marketData}>
        {children}
      </SellerProfile>
    );
  }
};

const SellerView = ({ children }: { children: ReactNode }) => {
  const { sellerId } = useStrictId();
  const navigate = useNavigate();
  const { data: marketData } = useGetMyMarket();

  return (
    <section className="relative flex w-full flex-1 flex-col">
      <PageHeader
        leftIcons={[
          <XIcon className="text-white" onClick={() => navigate(-1)} />,
        ]}
        additionalStyles="bg-black"
      />
      <h1 className="caption-m text-grey10 bg-grey02 fixed top-11 z-20 flex h-[2.3125rem] w-full max-w-[40rem] min-w-[20rem] items-center justify-center gap-2.5 p-2.5 md:w-[28rem]">
        일반 사용자에게 보이는 화면입니다.
      </h1>
      <article className="pointer-events-none flex w-full flex-1 flex-col pt-[5.0625rem]">
        {marketData && (
          <SellerProfile
            marketId={sellerId!}
            seller={true}
            marketInfo={marketData}
          >
            {children}
          </SellerProfile>
        )}
      </article>
    </section>
  );
};

const SellerProfile = ({
  children,
  marketId,
  marketInfo,
  seller = false,
}: {
  children: ReactNode;
  marketId: number;
  marketInfo: SellerMarketType | SellerMyMarketType;
  seller?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const USER_TABS = [
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

  const SELLER_TABS = [
    {
      id: 0,
      name: 'SELECTION',
      path: `${PATH.SELLER.BASE}/${PATH.SELLER.MY.BASE}/${PATH.SELLER.MY.PREVIEW.BASE}/${PATH.SELLER.MY.PREVIEW.TABS.SELECTION}`,
    },
    {
      id: 2,
      name: 'REVIEW',
      path: `null`,
    },
  ];

  const TABS = seller ? SELLER_TABS : USER_TABS;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { data: links } = useGetMarketLinks({
    sellerId: Number(marketId),
  });

  const { data: primaryNotice } = useGetPrimaryNotification({
    sellerId: marketId,
  });

  const sns: {
    id: number;
    ariaLabel: string;
    url: string | null;
    icon: ReactNode;
  }[] = [
    {
      id: 0,
      ariaLabel: ' 인스타그램 계정 바로가기',
      url: 'https://www.instagram.com/' + marketInfo.sellerProfile.instagram,
      icon: <InstagramIcon />,
    },
    {
      id: 1,
      ariaLabel: ' 유튜브 계정 바로가기',
      url: marketInfo.sellerProfile.youtube,
      icon: <YoutubeIcon />,
    },
    {
      id: 2,
      ariaLabel: ' 틱톡 계정 바로가기',
      url: marketInfo.sellerProfile.tiktok,
      icon: <TiktokIcon />,
    },
    {
      id: 3,
      ariaLabel: '에게 이메일 보내기',
      url: marketInfo.sellerProfile.email
        ? 'mailto:' + marketInfo.sellerProfile.email
        : null,
      icon: <EmailIcon />,
    },
  ].filter((s) => !!s.url);

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="relative flex h-[7.0625rem] w-full flex-col justify-end bg-[#8B8B8D]">
        <SellerProfileHeader
          name={marketInfo.sellerProfile.nickname}
          id={marketInfo.sellerProfile.username}
          seller={seller}
        />
        {marketInfo?.sellerProfile.backgroundImg && (
          <img
            src={marketInfo?.sellerProfile.backgroundImg}
            alt="내 배경사진"
            className="inset-0 flex h-full w-full object-cover"
          />
        )}
        <div className="absolute bottom-[.875rem] flex w-full shrink-0 items-center justify-end gap-[.625rem] px-5 text-[#F1F1F1CC] opacity-80">
          {sns?.map((s, index) => (
            <a
              key={index}
              href={s.url!}
              aria-label={'소현' + s.ariaLabel}
              className="cursor-pointer"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <SellerProfileCard sellerInfo={marketInfo.sellerProfile} />
      <div className="flex flex-col gap-2">
        {/* 링크 */}
        {links?.length !== 0 && (
          <div className="scrollbar-hide flex items-start gap-[.625rem] self-stretch overflow-x-auto px-5 py-2">
            {links.map((link: LinkType) => (
              <ExternalLinkChip key={link.id} link={link} />
            ))}
          </div>
        )}
        {/* 공지 */}
        {primaryNotice && (
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
              marketId={marketId}
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

export default SellerProfilePage;
