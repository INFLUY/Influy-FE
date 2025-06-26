import { useNavigate, useLocation } from 'react-router-dom';
import { ItemDetailInfo, PageHeader, BottomNavBar } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import { ItemDetail, SellerCard } from '@/types/common/ItemType.types';
import { SnackBar } from '@/components';
import { useState, useEffect } from 'react';
import { BottomNavItem } from '@/components/common/BottomNavBar';
import Link2Icon from '@/assets/icon/common/Link2Icon.svg?react';
import LockIcon from '@/assets/icon/common/LockIcon.svg?react';
import EditIcon from '@/assets/icon/common/EditIcon.svg?react';

const dummySellerInfo: SellerCard = {
  id: 1,
  nickname: '소현',
  profileImg: '/profile.png',
  instagram: 'xoyeone_',
};

const dummyItem: ItemDetail = {
  itemId: 1,
  itemPeriod: 2,
  itemName: '헤이드 리본 레이어드 티',
  startDate: '2025-06-07T09:00:00.660Z',
  endDate: '2025-07-07T09:00:00.660Z',
  tagline: '[소현X아로셀] 제작 / 살안타템 ',
  currentStatus: 'DEFAULT',
  marketLink: 'xxxx.com',
  isArchived: false,
  itemImgList: ['/product.png', '/img1.png', '/img1.png'],
  itemCategoryList: ['뷰티', '패션', '소품'],
  sellerInfo: dummySellerInfo,
  //comment, 할인가, 정상가 백에서 넘겨주는 데이터 형식에는 없음. 문의 필요
  comment:
    '10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는화점 명품 브랜드에 밀리지 않는 화점 명품 브랜드에 밀리지10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는 퀄리티로10분만에 품절된 원피스 다시가져왔어요! 백화점 명품 브랜드에 밀리지 않는화점 명품 브랜드에 밀리지 않는 화점 명품 브랜드에 밀리지브랜드에 밀리지브랜드에 밀리지브랜드에 밀리지',
  regularPrice: null,
  salePrice: null,
};

const SellerItemDetailPage = () => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const status = location.pathname.endsWith('/archived')
    ? 'archived'
    : location.pathname.endsWith('/published')
      ? 'published'
      : null;

  useEffect(() => {
    if (location.state?.isSnackbar == true) {
      const message: string =
        status === 'published'
          ? '상품이 게시되었습니다.'
          : '상품이 보관되었습니다.';
      setSnackbar({ open: true, message });
      //state 초기화
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 하단바
  const handleGoToPage = () => {};
  const handleOpenScopeModal = () => {};
  const detailBottomNavItems: BottomNavItem[] = [
    {
      label: '판매 페이지',
      onClick: handleGoToPage,
      icon: <Link2Icon className="h-6 w-6" />,
      aria: '판매 페이지로 이동',
    },
    {
      label: '공개 범위',
      onClick: handleOpenScopeModal,
      icon: <LockIcon className="h-6 w-6" />,
      aria: '공개 범위 설정',
    },
    {
      label: '상품 수정',
      onClick: () => {
        navigate('/my-market/item/new'); //추후 수정페이지로 라우팅 수정 필요
      },
      icon: <EditIcon className="h-6 w-6" />,
      aria: '상품 수정',
    }, //추후 상품 페이지로 이동하도록 수정 필요
  ];

  return (
    <>
      {/* 헤더 */}
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
            role="button"
            aria-label="뒤로 가기"
          />,
        ]}
        rightIcons={[
          <ShareIcon className="h-6 w-6 cursor-pointer text-black" />,
          <StatisticIcon className="h-6 w-6 cursor-pointer text-black" />,
        ]}
        additionalStyles="bg-white"
      >
        <div className="h-[1.6875rem]" />
      </PageHeader>
      {/* 상단 상품 정보 파트 */}
      <ItemDetailInfo data={dummyItem} status={status} />

      {/* 스낵바 */}
      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
      )}
      <BottomNavBar items={detailBottomNavItems} type="action" />
    </>
  );
};
export default SellerItemDetailPage;
