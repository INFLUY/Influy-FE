import { useNavigate, useLocation } from 'react-router-dom';
import { ItemDetailInfo, PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import { ItemDetail } from '@/types/common/ItemType.types';

const dummyItem: ItemDetail = {
  itemId: 1,
  itemPeriod: 1,
  itemName: '헤이드 리본 레이어드 티',
  startDate: '2025-06-07T09:24:22.660Z',
  endDate: '2025-06-07T09:24:22.660Z',
  tagline: '[소현X아로셀] 제작 / 살안타템',
  currentStatus: 'DEFAULT',
  marketLink: 'xxxx.com',
  isArchived: false,
  itemImgList: ['/img1.png', '/img1.png', '/img1.png'],
  itemCategoryList: ['뷰티', '패션', '소품'],
  comment:
    '10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는화점 명품 브랜드에 밀리지 않는 화점 명품 브랜드에 밀리지',
};

const SellerItemDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
          />,
        ]}
        rightIcons={[
          <ShareIcon className="h-6 w-6 cursor-pointer text-black" />,
          <StatisticIcon className="h-6 w-6 cursor-pointer text-black" />,
        ]}
      >
        <div className="h-[1.6875rem]" />
      </PageHeader>
      <ItemDetailInfo data={dummyItem} />
    </>
  );
};
export default SellerItemDetailPage;
