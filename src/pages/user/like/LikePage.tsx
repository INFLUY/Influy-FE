import { BottomNavBar, PageHeader, Tab, Tabs } from '@/components';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { ReactNode } from 'react';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';

const LikePage = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const TABS = [
    { id: 0, name: '상품', path: PATH.LIKE.TABS.ITEM },
    { id: 2, name: '인플루언서', path: PATH.LIKE.TABS.SELLER },
  ];

  return (
    <section className="relative flex w-full flex-1 flex-col items-center justify-center pt-[5.6875rem] pb-16">
      <section className="fixed top-0 z-20 w-full max-w-[40rem] min-w-[20rem] bg-white pt-11 md:w-[28rem]">
        <PageHeader
          leftIcons={[<h1 className="subhead-sb text-black">찜</h1>]}
          rightIcons={[
            <SearchIcon className="h-6 w-6 cursor-pointer" />,
            <button type="button" className="relative">
              <BellIcon className="h-6 w-6 cursor-pointer" />
              <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
            </button>,
          ]}
        />

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
      </section>
      <article className="flex w-full flex-1 flex-col">{children}</article>
      <BottomNavBar />
    </section>
  );
};

export default LikePage;
