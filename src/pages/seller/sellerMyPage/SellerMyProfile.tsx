import { ReactNode } from 'react';
import { PATH } from '@/routes/path';
import { Tab, Tabs } from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';

const SellerMyProfile = ({ children }: { children: ReactNode }) => {
  const TABS = [
    { id: 0, name: '상품', path: PATH.SELLER.tabs.selection },
    { id: 2, name: '보관', path: PATH.SELLER.tabs.stored },
    { id: 3, name: '리뷰', path: PATH.SELLER.tabs.review },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
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
    </>
  );
};

export default SellerMyProfile;
