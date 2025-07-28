import {
  PageHeader,
  BottomNavBar,
  HomeCommonSection,
  TopBannerSwiper,
  MoreButton,
} from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { dummyCategory } from '@/pages/seller/item/ItemDetailDummyData';
import { useState } from 'react';
import {
  itemMockData,
  recommendMockData,
} from '@/pages/user/home/HomeMockData';
import InfluencerCard, {
  InfluencerCardType,
} from '@/components/user/home/InfluencerCard';
import UserTypeSwithBanner from '@/components/seller/home/UserTypeSwitchBanner';
import { useAuthStore } from '@/store/authStore';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DEATIL, MARKET_DEATIL } from '@/utils/generatePath';

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

export const influencerMockData: InfluencerCardType[] = [
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
    profileImage: '',
  },
];

interface InfluencerPickItemType {
  name: string;
  itemId: number;
  sellerId: number;
  image: string;
  onClick: () => void;
}

export const pickMockData: InfluencerPickItemType[] = [
  {
    name: '비누',
    itemId: 1,
    sellerId: 1,
    image: '/product.png',
    onClick: () => {
      console.log('🎉 Banner 1 clicked - 신상품 페이지로 이동');
      // navigate('/new-items'); // 실제 라우팅
    },
  },
  {
    name: '비누',
    itemId: 15,
    sellerId: 2,
    image: '/banner.png',
    onClick: () => {
      console.log('🔥 Banner 2 clicked - 이벤트 페이지로 이동');
      // navigate('/event/123');
    },
  },
  {
    name: '비누',
    itemId: 11,
    sellerId: 3,
    image: '/img1.png',
    onClick: () => {
      console.log('⭐ Banner 3 clicked - 인플루언서 소개');
      // navigate('/influencer/thgusth');
    },
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedInfluencer, setSelectedInfluencer] = useState<number>(1);

  const { sellerId } = useAuthStore();

  const MyProfile = {
    id: 1,
    nickname: '혜선',
    username: '@thgusth',
    profileImage: '/profile.png',
  };

  return (
    <section className="top-banner-swiper-section bg-grey01 flex w-full flex-1 flex-col pt-11">
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
      <section className="scrollbar-hide flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {sellerId !== null && (
          <span className="flex w-full px-5 pt-4 pb-7">
            <UserTypeSwithBanner influencer={MyProfile} userType="user" />
          </span>
        )}
        <TopBannerSwiper data={topBannerMockData} />
        <section className="flex w-full flex-col gap-4 pt-7 pb-3">
          <h1 className="subhead-b px-5 text-black">내 취향의 인플루언서</h1>
          <ul className="scrollbar-hide flex gap-6 overflow-x-scroll px-5">
            {influencerMockData.map((influencer) => (
              <InfluencerCard
                key={influencer.id}
                influencer={influencer}
                selectedInfluencer={selectedInfluencer}
                setSelectedInfluencer={setSelectedInfluencer}
              />
            ))}
          </ul>
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
            <MoreButton
              onClickMore={() =>
                navigate(
                  generatePath(MARKET_DEATIL, { marketId: selectedInfluencer })
                )
              }
            />
          </div>

          {/* 사진 */}
          <div className="flex w-full gap-0.5 px-5">
            {pickMockData.map((item, index) => (
              <div
                className="aspect-square flex-1/3"
                key={index}
                onClick={() =>
                  navigate(
                    generatePath(ITEM_DEATIL, {
                      marketId: item.sellerId,
                      itemId: item.itemId,
                    })
                  )
                }
              >
                <img
                  src={item.image}
                  className="h-full w-full rounded-[.125rem] object-cover"
                  alt={item.name ?? '내 취향의 인플루언서 ㅇㅇ님이 픽한 상품'}
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
      </section>
      <BottomNavBar />
    </section>
  );
};

export default HomePage;
