import {
  EditSoldOutChip,
  EditTimeChip,
} from '@/components/seller/item/administration/EditStatusChip';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';
import { lazy, Suspense, useState } from 'react';
import { RadioInputList } from '@/components/seller/common/RadioInput.types';
import { generatePath, useNavigate } from 'react-router-dom';
import { SELLER_ITEM_DEATIL } from '@/utils/generatePath';
import { useSnackbarStore } from '@/store/snackbarStore';
import { ItemPreviewList } from '@/types/common/ItemType.types';

const RadioBottomSheet = lazy(
  () => import('@/components/seller/common/RadioBottomSheet')
);
const AdminItemBottomSheet = lazy(
  () => import('@/components/seller/item/administration/AdminItemBottomSheet')
);

const SellerMyItem = ({ item }: { item: ItemPreviewList }) => {
  const navigate = useNavigate();
  const [isEditItemOpen, setIsEditItemOpen] = useState<boolean>(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const { showSnackbar } = useSnackbarStore();

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

  return (
    <li
      className="flex cursor-pointer items-center justify-center gap-3 self-stretch px-5"
      onClick={(e) => {
        e.stopPropagation();
        const itemId = item.itemId;
        navigate(generatePath(SELLER_ITEM_DEATIL, { itemId }));
      }}
    >
      {/* 썸네일 */}
      <div className="relative flex h-[9.125rem] w-30 shrink-0">
        <img
          src={item?.mainImg ?? undefined}
          alt="상품 썸네일"
          className="bg-grey06 absolute h-[9.125rem] w-30 rounded-[.1875rem] object-cover"
        />
        {item.currentStatus === 'SOLD_OUT' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[.1875rem] bg-black/40 text-white">
            마감
          </div>
        )}
      </div>
      {/* 상품 정보 */}
      <div className="flex h-full flex-shrink-0 flex-grow basis-0 items-start justify-between">
        <div className="flex h-full flex-shrink-0 flex-grow basis-0 flex-col justify-between gap-3 align-middle">
          <div className="flex flex-col gap-[.375rem]">
            {/* 제목 */}
            <h1 className="body2-m line-clamp-2">{item?.itemName}</h1>
            {/* 기간 */}
            <p className="caption-m text-grey09 flex">
              2025.03.12(수)~03.23(토)
            </p>

            {/* 칩 */}
            <span className="caption-m text-grey07 flex items-center gap-1">
              상태 :
              {item?.currentStatus === 'SOLD_OUT' ? (
                <EditSoldOutChip onClick={() => setIsStatusModalOpen(true)} />
              ) : (
                <span className="flex flex-wrap gap-1">
                  <EditTimeChip
                    open={item?.startDate ?? null}
                    deadline={item?.endDate ?? null}
                    onClick={() => setIsStatusModalOpen(true)}
                  />
                </span>
              )}
            </span>
            <Suspense fallback={null}>
              {/* 상품 상태 설정 모달 */}
              {isStatusModalOpen && (
                <RadioBottomSheet
                  title="현재 상태 설정"
                  list={STATUS_LIST}
                  isOpen={isStatusModalOpen}
                  setIsOpen={setIsStatusModalOpen}
                />
              )}
            </Suspense>
          </div>
          {/* 질문 정보 */}
          <span className="caption-m text-grey07 divide-grey05 flex gap-1 divide-x">
            <p>
              응답대기 :{' '}
              <span className="text-grey11 pr-1">
                {item?.talkBoxInfo.waitingCnt}개
              </span>
            </p>
            <p>
              응답완료 :{' '}
              <span className="text-grey11 pr-1">
                {item?.talkBoxInfo.completedCnt}개
              </span>
            </p>
          </span>
        </div>
        <KebabIcon
          className="flex shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditItemOpen(true);
          }}
        />
      </div>
      <Suspense fallback={null}>
        {isEditItemOpen && (
          <AdminItemBottomSheet
            itemId={item.itemId}
            isOpen={isEditItemOpen}
            setIsOpen={setIsEditItemOpen}
            setIsItemDeletedSnackBarOpen={() =>
              showSnackbar('상품이 삭제되었습니다.')
            }
            setIsItemStoredSnackBarOpen={() =>
              showSnackbar('상품이 보관함으로 이동했습니다.')
            }
          />
        )}
      </Suspense>
    </li>
  );
};

export default SellerMyItem;
