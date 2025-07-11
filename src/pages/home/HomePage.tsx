import {
  PageHeader,
  BottomNavBar,
  HomeCommonSection,
  TopBannerSwiper,
  HomeSectionTitle,
} from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { dummyCategory } from '@/pages/seller/item/ItemDetailDummyData';
import { useState } from 'react';
import { itemMockData, recommendMockData } from '@/pages/home/HomeMockData';
import cn from '@/utils/cn';
import ArrowRightMiniIcon from '@/assets/icon/common/ArrowRightMini.svg?react';

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

interface Influencer {
  id: number;
  nickname: string;
  username: string;
  profileImage: string;
}

export const influencerMockData: Influencer[] = [
  {
    id: 1,
    nickname: '혜선',
    username: '@thgusth',
    profileImage: '/profile.png',
  },
  {
    id: 2,
    nickname: '수지수지',
    username: '@thgusth',
    profileImage: '/profile2.png',
  },
  {
    id: 3,
    nickname: '녕녕녕',
    username: '@thgusth',
    profileImage: '/profile3.png',
  },
  {
    id: 4,
    nickname: '안녕녕녕녕녕녕녕녕녕',
    username: '@thgusth',
    profileImage: '/profile4.png',
  },
  {
    id: 5,
    nickname: '호',
    username: '@thgusth',
    profileImage: '/profile4.png',
  },
  {
    id: 6,
    nickname: '호호',
    username: '@thg2usth',
    profileImage: '/profile4.png',
  },
];

export const pickMockData: TopBannerItem[] = [
  {
    image: '/product.png',
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
    image: '/img1.png',
    onClick: () => {
      console.log('⭐ Banner 3 clicked - 인플루언서 소개');
      // navigate('/influencer/thgusth');
    },
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedInfluencer, setSelectedInfluencer] = useState<number>(1);

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
      <section className="flex w-full flex-col gap-4 pt-7 pb-3">
        <h1 className="subhead-b px-5 text-black">내 취향의 인플루언서</h1>
        <div className="scrollbar-hide flex gap-6 overflow-x-scroll px-5">
          {influencerMockData.map((influencer) => (
            <InfluencerCard
              key={influencer.id}
              influencer={influencer}
              selectedInfluencer={selectedInfluencer}
              setSelectedInfluencer={setSelectedInfluencer}
            />
          ))}
        </div>
      </section>
      {/* 셀러가 픽한 상품 */}
      <section className="bg-grey02 mb-5 flex w-full flex-col gap-[.875rem] pt-4 pb-5">
        {/* 제목 */}
        <div className="flex items-center justify-between px-5">
          <h1 className="subhead-b text-black">
            {
              influencerMockData.find(
                (influencer) => influencer.id === selectedInfluencer
              )?.nickname
            }
            님이 <span className="text-main">Pick</span>한 상품
          </h1>
          <button
            type="button"
            onClick={() => {}}
            aria-label="더보기"
            className="body2-m text-grey10 flex items-center gap-[3px]"
          >
            더보기
            <ArrowRightMiniIcon className="h-2.5 w-2.5" />
          </button>
        </div>

        {/* 사진 */}
        <div className="flex w-full gap-0.5 px-5">
          {pickMockData.map((item) => (
            <div className="aspect-square flex-1/3">
              <img
                src={item.image}
                className="h-full w-full rounded-[.1273rem] object-cover"
              />
            </div>
          ))}
        </div>
      </section>
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

const InfluencerCard = ({
  influencer,
  selectedInfluencer,
  setSelectedInfluencer,
}: {
  influencer: Influencer;
  selectedInfluencer: number;
  setSelectedInfluencer: (id: number) => void;
}) => {
  return (
    <article
      className="flex flex-col items-center gap-2"
      onClick={() => setSelectedInfluencer(influencer.id)}
    >
      <img
        src={influencer.profileImage}
        alt="프로필 사진"
        className={cn(
          'aspect-square h-[3.75rem] rounded-full object-cover',
          selectedInfluencer == influencer.id && 'border-main border-[.0938rem]'
        )}
      />
      <div className="flex w-[3.75rem] flex-col items-center self-stretch text-[12.938px] leading-[150%] tracking-[-0.013px]">
        <p className="text-grey10 line-clamp-1 font-semibold">
          {influencer.nickname}
        </p>
        <p className="text-grey09 line-clamp-1 font-normal">
          {influencer.username}
        </p>
      </div>
    </article>
  );
};
