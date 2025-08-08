import {
  PageHeader,
  BottomNavBar,
  HomeCommonSection,
  TopBannerSwiper,
  NotificationButton,
  TrendingSellerSection,
  SearchButton,
} from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import { useEffect, useState } from 'react';
import UserTypeSwitchBanner from '@/components/seller/home/UserTypeSwitchBanner';
import { useGetItemCategory } from '@/services/itemCategory/useGetItemCategory';
import { useGetSellerProfile } from '@/services/seller/query/useGetSellerProfile';
import { useGetRecommendedItem } from '@/services/home/query/useGetRecommendedItem';
import { useGetCloseDeadlineItem } from '@/services/home/query/useGetCloseDeadlineItem';
import { useGetPopularItem } from '@/services/home/query/useGetPopularItem';
import { useGetTrendingSeller } from '@/services/home/query/useGetTrendingSeller';
import { useGetSellerPick } from '@/services/home/query/useGetSellerPick';
import Banner1 from '@/assets/image/banner/Banner1.png';
import Banner2 from '@/assets/image/banner/Banner2.png';
import Banner3 from '@/assets/image/banner/Banner3.png';

export interface TopBannerItem {
  image: string;
  path: string;
}

export interface SelectedInfluencerType {
  id: number | null;
  nickname: string;
}

export const topBanner: TopBannerItem[] = [
  {
    image: Banner2,
    path: 'https://forms.gle/5rTGW5xF6ZRnJV1u9',
  },
  {
    image: Banner1,
    path: '../market/1/selection',
  },
  {
    image: Banner3,
    path: '../market/3/selection',
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const allCategoryDto = {
    id: 0,
    name: '전체',
  };

  const [selectedInfluencer, setSelectedInfluencer] =
    useState<SelectedInfluencerType>({ id: null, nickname: '' });

  const { data: itemCategories } = useGetItemCategory();

  const { data: sellerMyProfile } = useGetSellerProfile();
  const { data: trendingSeller, isLoading: isTrendingSellerLoading } =
    useGetTrendingSeller();
  const { data: sellerPick, isLoading: isSellerPickLoading } = useGetSellerPick(
    selectedInfluencer.id
  );
  const { data: expiringItem, isLoading: isLoadingExpiring } =
    useGetCloseDeadlineItem({ size: 4 });
  const { data: trendingItem, isLoading: isLoadingTrending } =
    useGetPopularItem({ size: 3 });
  const { data: recommendItems, isLoading: isLoadingRecommended } =
    useGetRecommendedItem({
      categoryId: selectedCategory === 0 ? null : selectedCategory,
      size: 4,
    });

  useEffect(() => {
    if (trendingSeller && trendingSeller.length > 0) {
      setSelectedInfluencer({
        id: trendingSeller[0].sellerId,
        nickname: trendingSeller[0].sellerNickname,
      });
    }
  }, [trendingSeller]);

  return (
    <section className="top-banner-swiper-section bg-grey01 flex w-full flex-1 flex-col pt-11">
      <PageHeader
        leftIcons={[<InfluyIcon className="h-6 text-black" role="button" />]}
        rightIcons={[<SearchButton />, <NotificationButton />]}
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
        <TopBannerSwiper data={topBanner} />
        <TrendingSellerSection
          selectedInfluencer={selectedInfluencer}
          setSelectedInfluencer={setSelectedInfluencer}
          trendingSeller={trendingSeller}
          isTrendingSellerLoading={isTrendingSellerLoading}
          sellerPick={sellerPick}
          isSellerPickLoading={isSellerPickLoading}
        />

        <HomeCommonSection
          expiringItem={expiringItem?.pages[0]?.itemPreviewList || []}
          trendingItem={trendingItem?.pages[0]?.itemPreviewList || []}
          recommendedItem={recommendItems?.pages[0]?.itemPreviewList || []}
          isLoadingExpiring={isLoadingExpiring}
          isLoadingTrending={isLoadingTrending}
          isLoadingRecommended={isLoadingRecommended}
          categoryList={[
            allCategoryDto,
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
