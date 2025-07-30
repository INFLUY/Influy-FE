import { lazy, Suspense, useState } from 'react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { useNavigate } from 'react-router-dom';
import { AddButton, SellerMyItem } from '@/components';
import Arrow from '@/assets/icon/common/Chevron.svg?react';
import cn from '@/utils/cn';
import { RadioInputList } from '@/components/seller/common/RadioInput.types';
import { PATH } from '@/routes/path';
import { ItemPreviewList } from '@/types/common/ItemType.types';

const MySelectionTab = () => {
  const navigate = useNavigate();
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<{
    type: 'status' | 'edit' | 'sort' | null;
    itemId: number | null;
  }>({ type: null, itemId: null });
  const openStatusModal = (id: number) => {
    setActiveModal({ type: 'status', itemId: id });
  };

  const openEditModal = (id: number) => {
    setActiveModal({ type: 'edit', itemId: id });
  };

  const openSortModal = () => {
    setActiveModal({ type: 'sort', itemId: null });
  };

  const closeModal = () => {
    setActiveModal({ type: null, itemId: null });
  };

  const RadioBottomSheet = lazy(
    () => import('@/components/seller/common/RadioBottomSheet')
  );
  const AdminItemBottomSheet = lazy(
    () => import('@/components/seller/item/administration/AdminItemBottomSheet')
  );

  const STATUS_LIST: RadioInputList[] = [
    {
      id: 0,
      text: '기본 자동 표기',
      description:
        '- 시작 전 : D-N 카운트, D-DAY는 오픈 시각 표기\n- 오픈~마감 24시간 전 : NOW OPEN\n- 마감 24시간 전~마감 : 23:59:59 LEFT\n- 연장 진행 시 : 기간 연장 표기\n  • 마감일 설정창에서 연장 표기 가능',
    },
    {
      id: 1,
      text: 'SOLD OUT 표기',
      description: '마감 기한 전 완판 되었을 경우, 품절을 표기합니다.',
    },
  ];

  const PRODUCT_LIST: ItemPreviewList[] = [
    {
      itemId: 1,
      sellerId: 101,
      itemPeriod: 30,
      itemName: '빈티지 레코드 플레이어',
      sellerName: '레트로샵',
      startDate: '2025-07-01T00:00:00Z',
      endDate: '2025-07-31T23:59:59Z',
      tagline: '음악의 감성을 되살리다',
      currentStatus: 'DEFAULT',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'INITIAL',
        waitingCnt: 2,
        completedCnt: 1,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 2,
      sellerId: 102,
      itemPeriod: 15,
      itemName: '디지털 액자',
      sellerName: '테크하우스',
      startDate: '2025-07-10T00:00:00Z',
      endDate: '2025-07-25T23:59:59Z',
      tagline: '추억을 담는 새로운 방법',
      currentStatus: 'EXTEND',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'OPENED',
        waitingCnt: 0,
        completedCnt: 5,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 3,
      sellerId: 103,
      itemPeriod: 10,
      itemName: '한정판 피규어',
      sellerName: '콜렉터즈존',
      tagline: '마니아를 위한 최고의 선택',
      currentStatus: 'DEFAULT',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'CLOSED',
        waitingCnt: 3,
        completedCnt: 10,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 4,
      sellerId: 104,
      itemPeriod: 60,
      itemName: '프리미엄 커피머신',
      sellerName: '카페기어',
      startDate: '2025-06-01T00:00:00Z',
      endDate: '2025-07-30T23:59:59Z',
      tagline: '집에서도 바리스타처럼',
      currentStatus: 'DEFAULT',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'OPENED',
        waitingCnt: 1,
        completedCnt: 2,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 5,
      sellerId: 105,
      itemPeriod: 7,
      itemName: '무선 이어폰',
      sellerName: '사운드웨이브',
      tagline: '자유로운 사운드',
      currentStatus: 'EXTEND',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'INITIAL',
        waitingCnt: 5,
        completedCnt: 1,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 6,
      sellerId: 106,
      itemPeriod: 20,
      itemName: '캠핑용 미니 냉장고',
      sellerName: '캠프존',
      startDate: '2025-07-05T00:00:00Z',
      endDate: '2025-07-25T23:59:59Z',
      tagline: '야외에서도 시원하게',
      currentStatus: 'DEFAULT',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'OPENED',
        waitingCnt: 0,
        completedCnt: 3,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 7,
      sellerId: 107,
      itemPeriod: 45,
      itemName: '럭셔리 손목시계',
      sellerName: '타임하우스',
      startDate: '2025-06-20T00:00:00Z',
      endDate: '2025-08-04T23:59:59Z',
      tagline: '시간을 담은 예술',
      currentStatus: 'SOLD_OUT',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'CLOSED',
        waitingCnt: 7,
        completedCnt: 12,
      },
      mainImg: '/img1.png',
    },
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
  };

  // 임시 정렬 상태
  const SORT_BY = '등록순';

  const SORT_BY_LIST: RadioInputList[] = [
    { id: 0, text: '마감일 빠른 순' },
    { id: 1, text: '등록 순' },
  ];

  return (
    <section className="flex w-full flex-col gap-4 pt-5 pb-36">
      <span className="flex w-full justify-between px-5">
        <span className="flex cursor-pointer items-center gap-[.375rem]">
          <input
            type="checkbox"
            id="filterItemInProgress"
            hidden
            checked={inProgress}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="filterItemInProgress"
            className="text-grey08 caption-m flex cursor-pointer items-center gap-[.375rem]"
          >
            {inProgress ? <CheckBoxOn /> : <CheckBoxOff />}
            진행 중인 상품만 보기
          </label>
        </span>
        <button
          type="button"
          onClick={openSortModal}
          className="caption-m text-grey08 flex cursor-pointer items-center gap-1 px-[.625rem] py-[.1875rem] text-center"
        >
          정렬 방식 : <span className="caption-b text-grey09">{SORT_BY}</span>{' '}
          <Arrow
            className={cn('text-grey07 h-3 w-3 rotate-90', {
              '-rotate-90': activeModal.type === 'sort',
            })}
          />
        </button>
      </span>

      {/* 정렬 방식 설정 모달 */}
      <Suspense fallback={null}>
        {activeModal.type === 'sort' && (
          <RadioBottomSheet
            title="정렬방식"
            description="설정한 정렬대로 유저에게 보여집니다."
            list={SORT_BY_LIST}
            closeModal={closeModal}
          />
        )}
      </Suspense>

      {PRODUCT_LIST && PRODUCT_LIST?.length !== 0 && (
        <ul className="flex flex-col items-start gap-5 self-stretch pb-1">
          {PRODUCT_LIST?.map((item) => (
            <SellerMyItem
              key={item.itemId}
              item={item}
              openStatusModal={() => openStatusModal(item.itemId)}
              openEditModal={() => openEditModal(item.itemId)}
            />
          ))}
        </ul>
      )}
      <Suspense fallback={null}>
        {/* 상품 상태 설정 모달 */}
        {activeModal.type === 'status' && activeModal.itemId !== null && (
          <RadioBottomSheet
            title="현재 상태 설정"
            itemId={activeModal.itemId}
            list={STATUS_LIST}
            closeModal={closeModal}
          />
        )}
      </Suspense>
      <Suspense fallback={null}>
        {activeModal.type === 'edit' && activeModal.itemId !== null && (
          <AdminItemBottomSheet
            itemId={activeModal.itemId}
            closeModal={closeModal}
          />
        )}
      </Suspense>
      <div className="flex w-full px-5">
        <AddButton
          size="base"
          handleOnClick={() =>
            navigate(
              `${PATH.SELLER.BASE}/${PATH.SELLER.ITEM.BASE}/${PATH.SELLER.ITEM.REGISTRATION.BASE}`
            )
          }
        >
          상품 추가하기
        </AddButton>
      </div>
    </section>
  );
};

export default MySelectionTab;
