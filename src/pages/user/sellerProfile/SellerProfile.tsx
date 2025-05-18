import { ReactNode } from 'react';
import { Tab, Tabs } from '@/components/common/Tab';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from '@/components';

const SellerProfile = ({ children }: { children: ReactNode }) => {
  const TABS = [
    { id: 0, name: 'SELECTION', path: PATH.SELLER_PROFILE.tabs.selection },
    { id: 2, name: 'REVIEW', path: PATH.SELLER_PROFILE.tabs.review },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
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
    </>
  );
};

export default SellerProfile;
