import { ReactNode } from 'react';
import { Tab, Tabs } from '@/components/common/Tab';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, Notice } from '@/components';

const SellerProfile = ({ children }: { children: ReactNode }) => {
  const TABS = [
    { id: 0, name: 'SELECTION', path: PATH.SELLER_PROFILE.tabs.selection },
    { id: 2, name: 'REVIEW', path: PATH.SELLER_PROFILE.tabs.review },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // 임시 링크
  const LINKS = [
    { id: 0, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 1, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 2, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
    { id: 3, name: '크림치즈마켓', url: 'https://m.creamcheese.co.kr/' },
  ];

  return (
    <>
      {/* 공지 */}
      <div className="bg-grey02 flex w-full px-5 py-3">
        <Notice
          children={
            '🍎부스터 프로🍎 이틀 연장합니다! D-4! 주문 서둘러 주세요!!!!'
          }
          count={2}
          seller={true}
          onClickNotice={() => {}}
        />
      </div>
      <section className="divide-grey02 flex flex-col divide-y-[12px]">
        <div className="scrollbar-hide flex items-start gap-[.625rem] self-stretch overflow-x-auto px-5 py-3">
          {LINKS.map((link) => (
            <Link key={link.id} name={link.name} url={link.url} />
          ))}
        </div>
        <Tabs>
          {TABS.map((tab) => (
            <Tab
              key={tab.name}
              handleClickTab={() => navigate(tab.path)}
              isTabActive={pathname.includes(tab.path)}
            >
              {tab.name}
            </Tab>
          ))}
        </Tabs>
        {children}
      </section>
    </>
  );
};

export default SellerProfile;
