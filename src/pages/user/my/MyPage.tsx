import { BottomNavBar, PageHeader } from '@/components';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';

const MyPage = () => {
  return (
    <section className="bg-grey01 flex flex-1 justify-center pt-11 pb-16">
      <PageHeader
        leftIcons={[<h1 className="subhead-sb text-black">마이</h1>]}
        rightIcons={[
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
          </button>,
        ]}
      />
      <div className="body1-sb flex flex-1 items-center justify-center">
        마이페이지
      </div>
      <BottomNavBar />
    </section>
  );
};

export default MyPage;
