import { ReactNode } from 'react';
import { PATH } from '@/routes/path';
import {
  ExternalLinkChip,
  NoticeBanner,
  SellerProfileCard,
  Tab,
  Tabs,
} from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';
import SellerMyProfileHeader from './SellerMyProfileHeader';
import { NoticeType } from '@/types/types';

const SellerMyProfile = ({ children }: { children: ReactNode }) => {
  const TABS = [
    { id: 0, name: '상품', path: PATH.SELLER.tabs.selection },
    { id: 2, name: '보관', path: PATH.SELLER.tabs.stored },
    { id: 3, name: '리뷰', path: PATH.SELLER.tabs.review },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 임시 링크
  const LINKS = [
    { id: 0, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 1, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 2, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 3, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
  ];

  // 임시 공지사항
  const NOTICES: NoticeType[] = [
    {
      id: 0,
      title: '🍎부스터 프로🍎 이틀 연장합니다! D-4! ',
      date: '2025.05.01',
      content:
        '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ㅎㅎ 많은 관심 감사합니다!',
    },
    {
      id: 1,
      title: '제작 오픈 이벤트',
      date: '2025.05.01',
      content: '부스터 프로 이번 반응이 너무 좋아서 이틀 연장하기로 했어요 ',
    },
  ];

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <div className="realtive flex h-[7.0625rem] w-full flex-col bg-[#8B8B8D]">
        <SellerMyProfileHeader />
      </div>
      <SellerProfileCard seller={true} />
      {/* 공지 */}
      <div className="bg-grey02 flex w-full px-5 py-3">
        <NoticeBanner
          title={NOTICES[0]?.title}
          count={NOTICES?.length}
          onClickNotice={() => navigate('')}
          seller={true}
        />
      </div>

      <section className="divide-grey02 flex flex-col divide-y-[12px]">
        {/* 링크 */}
        <div className="scrollbar-hide flex items-start gap-[.625rem] self-stretch overflow-x-auto px-5 py-3">
          {LINKS.map((link) => (
            <ExternalLinkChip
              key={link.id}
              name={link.name}
              url={link.url}
              edit={true}
            />
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

export default SellerMyProfile;
