import { PageHeader, MyProductStatus, BottomNavBar } from '@/components';
import InfluyIcon from '@/assets/icon/common/InfluyIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import UserTypeSwithBanner from '@/components/seller/home/UserTypeSwitchBanner';
import { useGetSellerProfile } from '@/services/seller/query/useGetSellerProfile';
import { SellerHomeItemStatus } from '@/types/common/ItemType.types';

const SellerHomePage = () => {
  const { data: sellerMyProfile } = useGetSellerProfile();

  //임시
  const items: SellerHomeItemStatus[] | [] = [
    {
      itemId: 1,
      imageUrl: '/image.png',
      itemStatus: 'DEFAULT',
      itemPeriod: 2,
      itemTitle: '신나는 여행 패키지',
      startDate: '2025-06-30T10:47:28.124Z',
      endDate: '2025-08-30T10:47:28.124Z',
      totalPendingQuestions: 12,
      newQuestions: 3,
      topCategories: ['일자 조정', '인원 수 문의', '날짜'],
    },
    {
      itemId: 2,
      imageUrl: '/image.png',
      itemStatus: 'DEFAULT',
      itemPeriod: 1,
      itemTitle:
        '단돈 40만원대로 방콕 풀패키지 여행 (초특가)로 방콕 풀패키지 여행',
      startDate: '2025-08-03T10:47:28.124Z',
      endDate: '2025-09-30T10:47:28.124Z',
      totalPendingQuestions: 12,
      newQuestions: 0,
      topCategories: [],
    },
  ];

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
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
          </button>,
        ]}
        additionalStyles="border-0 h-11"
      />
      <section className="scrollbar-hide flex w-full flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto py-4">
        {sellerMyProfile && (
          <span className="w-full px-5">
            <UserTypeSwithBanner
              influencer={sellerMyProfile}
              userType="influencer"
            />
          </span>
        )}

        <MyProductStatus items={items} />

        <BottomNavBar userType="SELLER" />
      </section>
    </section>
  );
};
export default SellerHomePage;
