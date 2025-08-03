import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';
import ArrowIcon from '@/assets/icon/common/ArrowRight12.svg?react';
import { generatePath, useNavigate } from 'react-router-dom';
import { SELLER_ITEM_DETAIL } from '@/utils/generatePath';
import { SellerItemPreviewList } from '@/types/common/ItemType.types';
import { formatKrDate } from '@/utils/formatDate';
import { EditStatusUnifiedChip, PeriodChip } from '@/components';
import { isItemClosed } from '@/utils/dateUtils';

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
      <div className="relative flex h-[8.3125rem] w-30 shrink-0">
        {item.mainImg && (
          <img
            src={item.mainImg}
            alt="상품 썸네일"
            className="h-[8.3125rem] w-30 bg-white object-cover"
          />
        )}
        {!item.mainImg && (
          <div
            aria-label="상품 이미지가 없습니다."
            className="bg-grey06 h-[8.3125rem] w-30"
          />
        )}
        {isItemClosed(item.endDate) && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
            마감
          </div>
        )}
        <div className="absolute bottom-0 left-0 flex flex-wrap">
          <PeriodChip period={item.itemPeriod} />
        </div>
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
              <EditStatusUnifiedChip
                currentStatus={item?.currentStatus}
                open={item?.startDate ?? undefined}
                deadline={item?.endDate ?? undefined}
                onClick={openStatusModal}
              />
            </span>
          </div>
          {/* 톡박스 */}
          <div
            className="caption-m text-grey07 flex items-center justify-between"
            onClick={() => {}}
          >
            {item?.talkBoxInfo.talkBoxOpenStatus !== 'OPENED' && (
              <>톡박스가 비활성화되어 있습니다.</>
            )}
            {item?.talkBoxInfo.talkBoxOpenStatus === 'OPENED' && (
              <span className="divide-grey05 flex items-center gap-1 divide-x">
                <p>
                  응답대기 :{' '}
                  <span className="text-grey11 pr-1">
                    {item?.talkBoxInfo.waitingCnt}개
                  </span>
                </p>
                <p>응답완료 : {item?.talkBoxInfo.completedCnt}개</p>
              </span>
            )}
            <ArrowIcon className="text-grey07" />
          </div>
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
