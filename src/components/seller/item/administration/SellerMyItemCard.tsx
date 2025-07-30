import {
  EditSoldOutChip,
  EditTimeChip,
} from '@/components/seller/item/administration/EditStatusChip';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';
import { generatePath, useNavigate } from 'react-router-dom';
import { SELLER_ITEM_DETAIL } from '@/utils/generatePath';
import { SellerItemPreviewList } from '@/types/common/ItemType.types';
import { formatKrDate } from '@/utils/formatDate';

const SellerMyItemCard = ({
  item,
  openStatusModal,
  openEditModal,
}: {
  item: SellerItemPreviewList;
  openStatusModal: () => void;
  openEditModal: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <li
      className="flex cursor-pointer items-center justify-center gap-3 self-stretch px-5"
      onClick={(e) => {
        e.stopPropagation();
        navigate(generatePath(SELLER_ITEM_DETAIL, { itemId: item.itemId }));
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
            {item?.startDate && item?.endDate && (
              <p className="caption-m text-grey09 flex">
                {formatKrDate(item?.startDate)}~{formatKrDate(item?.endDate)}
              </p>
            )}

            {/* 칩 */}
            <span className="caption-m text-grey07 flex items-center gap-1">
              상태 :
              {item?.currentStatus === 'SOLD_OUT' ? (
                <EditSoldOutChip onClick={openStatusModal} />
              ) : (
                <EditTimeChip
                  open={item?.startDate ?? null}
                  deadline={item?.endDate ?? null}
                  onClick={openStatusModal}
                />
              )}
            </span>
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
            openEditModal();
          }}
        />
      </div>
    </li>
  );
};

export default SellerMyItemCard;
