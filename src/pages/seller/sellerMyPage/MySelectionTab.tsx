import { lazy, Suspense, useRef, useState } from 'react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AddButton, LoadingSpinner, SellerMyItemCard } from '@/components';
import Arrow from '@/assets/icon/common/Chevron.svg?react';
import cn from '@/utils/cn';
import { RadioInputList } from '@/components/seller/common/RadioInput.types';
import { PATH } from '@/routes/path';
import { useGetMarketItems } from '@/services/sellerItem/query/useGetMarketItems';
import { SellerItemPreviewList } from '@/types/common/ItemType.types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const MySelectionTab = () => {
  const { sellerId } = useOutletContext<{ sellerId: number }>();
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

  const {
    data: marketItemList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMarketItems({
    sellerId: sellerId,
    archive: false,
    onGoing: inProgress,
    size: 8,
  });

  const itemList = marketItemList?.pages
    .flatMap((page) => page?.itemPreviewList ?? [])
    .filter(Boolean) as SellerItemPreviewList[];

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

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

      {itemList && itemList?.length !== 0 && (
        <ul className="flex flex-col items-start gap-5 self-stretch pb-1">
          {itemList?.map((item) => (
            <SellerMyItemCard
              key={item.itemId}
              item={item}
              openStatusModal={() => openStatusModal(item.itemId)}
              openEditModal={() => openEditModal(item.itemId)}
            />
          ))}
          {hasNextPage && (
            <div ref={observerRef} className="h-4 w-full">
              {isFetchingNextPage && (
                <div className="flex justify-center">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          )}
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
