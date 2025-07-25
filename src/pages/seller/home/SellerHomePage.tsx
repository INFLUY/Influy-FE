import { PageHeader, MyProductStatus, BottomNavBar } from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import UserTypeSwithBanner from '@/components/seller/home/UserTypeSwitchBanner';

const SellerHomePage = () => {
  const MyProfile = {
    id: 1,
    nickname: '혜선',
    username: '@thgusth',
    profileImage: '/profile.png',
  };

  return (
    <section className="bg-grey01 relative mt-11 flex w-full flex-1 flex-col">
      <PageHeader
        leftIcons={[
          <InfluyIcon
            className="h-6 text-black"
            role="button"
            aria-label="뒤로 가기"
          />,
        ]}
        rightIcons={[
          <SearchIcon className="h-6 w-6 cursor-pointer" />,
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
          </button>,
        ]}
        additionalStyles="border-0 h-11"
      />
      <section className="scrollbar-hide flex w-full flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto py-4">
        <span className="w-full px-5">
          <UserTypeSwithBanner influencer={MyProfile} userType="influencer" />
        </span>

        <MyProductStatus />

        <BottomNavBar userType="SELLER" />
      </section>
    </section>
  );
};
export default SellerHomePage;
