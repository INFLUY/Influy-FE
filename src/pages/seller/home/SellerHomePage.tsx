import { PageHeader, MyProductStatus, BottomNavBar } from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';

const SellerHomePage = () => {
  return (
    <section className="bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <PageHeader
        leftIcons={[<InfluyIcon role="button" aria-label="뒤로 가기" />]}
        rightIcons={[
          <SearchIcon className="h-6 w-6 cursor-pointer" />,
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full bg-[#F43232]" />
          </button>,
        ]}
        additionalStyles="border-0 h-11"
      />
      <MyProductStatus />

      <BottomNavBar userType="SELLER" />
    </section>
  );
};
export default SellerHomePage;
