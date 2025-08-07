import {
  PageHeader,
  MyProductStatus,
  BottomNavBar,
  NotificationButton,
} from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import UserTypeSwitchBanner from '@/components/seller/home/UserTypeSwitchBanner';
import { useGetSellerProfile } from '@/services/seller/query/useGetSellerProfile';
import { SellerHomeItemStatus } from '@/types/common/ItemType.types';
import { useGetHomeQuestions } from '@/services/home/query/useGetHomeQuestions';
import { useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const SellerHomePage = () => {
  const { data: sellerMyProfile } = useGetSellerProfile();
  const {
    data: homeItemData,
    hasAnyItem,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetHomeQuestions({ size: 8 });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const itemList = homeItemData?.pages
    .flatMap((page) => page?.itemList ?? [])
    .filter(Boolean) as SellerHomeItemStatus[];

  return (
    <section className="bg-grey01 relative mt-11 flex w-full flex-1 flex-col pb-16">
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
          <NotificationButton />,
        ]}
        additionalStyles="border-0 h-11"
      />
      <section className="scrollbar-hide flex w-full flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto py-4">
        {sellerMyProfile && (
          <span className="w-full px-5">
            <UserTypeSwitchBanner
              influencer={sellerMyProfile}
              userType="influencer"
            />
          </span>
        )}

        {sellerMyProfile && (
          <MyProductStatus
            sellerId={sellerMyProfile?.sellerId}
            items={itemList}
            hasAnyItem={hasAnyItem}
          />
        )}

        <BottomNavBar userType="SELLER" />
      </section>
    </section>
  );
};
export default SellerHomePage;
