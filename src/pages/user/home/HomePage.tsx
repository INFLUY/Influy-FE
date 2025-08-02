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
import { useEffect, useState } from 'react';
import UserTypeSwitchBanner from '@/components/seller/home/UserTypeSwitchBanner';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DEATIL, MARKET_DEATIL } from '@/utils/generatePath';
import { useGetItemCategory } from '@/services/itemCategory/useGetItemCategory';
import { useGetSellerProfile } from '@/services/seller/query/useGetSellerProfile';
import { useGetRecommendedItem } from '@/services/home/query/useGetRecommendedItem';
import { useGetCloseDeadlineItem } from '@/services/home/query/useGetCloseDeadlineItem';
import { useGetPopularItem } from '@/services/home/query/useGetPopularItem';
import { useGetTrendingSeller } from '@/services/home/query/useGetTrendingSeller';
import InfluencerCard from '@/components/user/home/InfluencerCard';
import { useGetSellerPick } from '@/services/home/query/useGetSellerPick';

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
  const allCateogryDto = {
    id: 0,
    name: '전체',
  };
  const [selectedInfluencer, setSelectedInfluencer] = useState<{
    id: number | null;
    nickname: string;
  }>({ id: null, nickname: '' });

  const { data: itemCategories } = useGetItemCategory();

  const { data: sellerMyProfile } = useGetSellerProfile();
  const { data: trendingSeller } = useGetTrendingSeller();
  const { data: sellerPick } = useGetSellerPick(selectedInfluencer.id);
  const { data: expiringItem } = useGetCloseDeadlineItem({
    size: 4,
  });
  const { data: trendingItem } = useGetPopularItem({
    size: 3,
  });
  const { data: recommendItems } = useGetRecommendedItem({
    categoryId: selectedCategory === 0 ? null : selectedCategory,
    size: 4,
  });

  useEffect(() => {
    if (trendingSeller) {
      setSelectedInfluencer({
        id: trendingSeller[0].sellerId,
        nickname: trendingSeller[0].sellerNickname,
      });
    }
  }, [trendingSeller]);

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
        {sellerMyProfile && (
          <span className="flex w-full px-5 pt-4 pb-7">
            <UserTypeSwitchBanner
              influencer={sellerMyProfile}
              userType="user"
            />
          </span>
        )}
        <TopBannerSwiper data={topBannerMockData} />
        <section className="flex w-full flex-col gap-4 pt-7 pb-3">
          <h1 className="subhead-b px-5 text-black">요즘 핫한 인플루언서</h1>
          <ul className="scrollbar-hide flex gap-6 overflow-x-auto px-5">
            {trendingSeller &&
              trendingSeller.map((influencer) => (
                <InfluencerCard
                  key={influencer.sellerId}
                  influencer={influencer}
                  selectedInfluencer={selectedInfluencer.id}
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
              {selectedInfluencer.nickname}
              님이 <span className="text-main">Pick</span>한 상품
            </h1>
            <MoreButton
              onClickMore={() =>
                navigate(
                  generatePath(MARKET_DEATIL, {
                    marketId: selectedInfluencer.id,
                  })
                )
              }
            />
          </div>

          {/* 사진 */}
          {sellerPick?.mainImgList && sellerPick?.mainImgList.length > 0 ? (
            <div className="flex w-full gap-0.5 px-5">
              {sellerPick?.mainImgList.map((item, index) => (
                <div
                  className="aspect-square w-1/3"
                  key={index}
                  onClick={() =>
                    navigate(
                      generatePath(ITEM_DEATIL, {
                        marketId: sellerPick.sellerId,
                        itemId: item.itemId,
                      })
                    )
                  }
                >
                  <img
                    src={item.mainImg}
                    className="aspect-square rounded-[.125rem] object-cover"
                    alt={`${selectedInfluencer.nickname}님이 픽한 상품`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="body1-sb flex h-[6.875rem] items-center justify-center">
              아직 등록된 상품이 없어요
            </div>
          )}
        </section>
        <HomeCommonSection
          expiringItem={expiringItem?.pages[0]?.itemPreviewList || []}
          trendingItem={trendingItem?.pages[0]?.itemPreviewList || []}
          recommendedItem={recommendItems?.pages[0]?.itemPreviewList || []}
          categoryList={[
            allCateogryDto,
            ...(itemCategories?.categoryDtoList ?? []),
          ]}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>
      <BottomNavBar />
    </section>
  );
};

export default HomePage;
