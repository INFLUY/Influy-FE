import {
  PageHeader,
  BottomNavBar,
  HomeCommonSection,
  TopBannerSwiper,
} from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { dummyCategory } from '@/pages/seller/item/ItemDetailDummyData';
import { useState } from 'react';
import { itemMockData, recommendMockData } from '@/pages/home/HomeMockData';

interface TopBannerItem {
  image: string;
  onClick: () => void;
}
export const topBannerMockData: TopBannerItem[] = [
  {
    image: '/banner.png',
    onClick: () => {
      console.log('🎉 Banner 1 clicked - 신상품 페이지로 이동');
      // navigate('/new-items'); // 실제 라우팅
    },
  },
  {
    image: '/banner.png',
    onClick: () => {
      console.log('🔥 Banner 2 clicked - 이벤트 페이지로 이동');
      // navigate('/event/123');
    },
  },
  {
    image: '/banner.png',
    onClick: () => {
      console.log('⭐ Banner 3 clicked - 인플루언서 소개');
      // navigate('/influencer/thgusth');
    },
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section className="top-banner-swiper-section bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <PageHeader
        leftIcons={[<InfluyIcon role="button" aria-label="뒤로 가기" />]}
        rightIcons={[
          <SearchIcon className="h-6 w-6 cursor-pointer" />,
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full bg-[#F43232]" />
          </button>,
        ]}
        additionalStyles="bg-white border-0 "
      >
        <div className="h-[1.6875rem]" />
      </PageHeader>
      <TopBannerSwiper data={topBannerMockData} />

      <HomeCommonSection
        expiringItem={itemMockData}
        trendingItem={itemMockData}
        recommendedItem={recommendMockData}
        categoryList={dummyCategory}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <BottomNavBar />
    </section>
  );
};

export default HomePage;
