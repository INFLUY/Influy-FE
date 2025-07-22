import {
  PageHeader,
  MyProductStatus,
  BottomNavBar,
  HomeCommonSection,
} from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { dummyCategory } from '@/pages/seller/item/ItemDetailDummyData';
import { useState } from 'react';
import { itemMockData, recommendMockData } from '@/pages/home/HomeMockData';
const SellerHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section className="bg-grey01 relative flex w-full flex-1 flex-col">
      <PageHeader
        leftIcons={[<InfluyIcon role="button" aria-label="뒤로 가기" />]}
        rightIcons={[
          <SearchIcon className="h-6 w-6 cursor-pointer" />,
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full bg-[#F43232]" />
          </button>,
        ]}
        additionalStyles="border-0 "
      />
      <section className="scrollbar-hide flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <MyProductStatus />
        <HomeCommonSection
          expiringItem={itemMockData}
          trendingItem={itemMockData}
          recommendedItem={recommendMockData}
          categoryList={dummyCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      <BottomNavBar />
    </section>
  );
};
export default SellerHomePage;
