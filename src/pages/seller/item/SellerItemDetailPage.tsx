import { useNavigate, useLocation } from 'react-router-dom';
import { ItemDetailInfo, PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import {
  ItemDetail,
  SellerCard,
  ItemStatus,
} from '@/types/common/ItemType.types';
import { SnackBar } from '@/components';
import { useState, useEffect } from 'react';

const dummySellerInfo: SellerCard = {
  id: 1,
  nickname: '소현',
  profileImg: '/profile.png',
  instagram: 'xoyeone_',
};

const dummyItem: ItemDetail = {
  itemId: 1,
  itemPeriod: 1,
  itemName: '헤이드 리본 레이어드 티',
  startDate: '2025-06-07T09:00:00.660Z',
  endDate: '2025-07-07T09:00:00.660Z',
  tagline: '[소현X아로셀] 제작 / 살안타템',
  currentStatus: 'DEFAULT',
  marketLink: 'xxxx.com',
  isArchived: false,
  itemImgList: ['/product.png', '/img1.png', '/img1.png'],
  itemCategoryList: ['뷰티', '패션', '소품'],
  sellerInfo: dummySellerInfo,
  //comment 백에서 넘겨주는 데이터 형식에는 없음. 문의 필요
  comment:
    '10분만에 품절된 원피스 다시가져왔어요!10분만에 품절된 원피스 다시가져왔어요!10분만에 품절된 원피스 다시가져왔어요!10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는화점 명품 브랜드에 밀리지 않는 화점 명품 브랜드에 밀리지',
};

const SellerItemDetailPage = () => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const rawStatus = new URLSearchParams(location.search).get('status');

  const isValidStatus = (value: string | null): value is ItemStatus => {
    return value === 'saved' || value === 'published';
  };

  if (!isValidStatus(rawStatus)) return null; // 조건에 안 맞으면 아무 것도 렌더링하지 않음
  const status: ItemStatus = rawStatus;

  useEffect(() => {
    const message: string =
      status === 'published'
        ? '상품이 게시되었습니다.'
        : '상품이 보관되었습니다.';
    setSnackbar({ open: true, message });
  }, []);

  return (
    <>
      {/* 헤더 */}
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
      {/* 상단 상품 정보 파트 */}
      <ItemDetailInfo data={dummyItem} status={status} />
      {/* 스낵바 */}
      <SnackBar
        handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
      >
        {snackbar.message}
      </SnackBar>
    </>
  );
};
export default SellerItemDetailPage;
