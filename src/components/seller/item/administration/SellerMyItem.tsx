import { MyItem } from '@/types/types';
import {
  EditSoldOutChip,
  EditTimeChip,
} from '@/components/seller/item/administration/EditStatusChip';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';
import { useState } from 'react';
import AdminItemBottomSheet from './AdminItemBottomSheet';

const SellerMyItem = ({ item }: { item: MyItem }) => {
  const [isEditItemOpen, setIsEditItemOpen] = useState<boolean>(false);

  const handleEditMyItem = () => {
    setIsEditItemOpen(true);
  };

  return (
    <li className="flex cursor-pointer items-center justify-center gap-3 self-stretch px-5">
      {/* 썸네일 */}
      <div className="relative flex h-[9.125rem] w-30 shrink-0">
        <img
          src={item?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
          마감
        </div>
      </div>
      {/* 상품 정보 */}
      <div className="flex h-full flex-shrink-0 flex-grow basis-0 items-start justify-between">
        <div className="flex h-full flex-shrink-0 flex-grow basis-0 flex-col justify-between gap-3 align-middle">
          <div className="flex flex-col gap-[.375rem]">
            {/* 셀러 name */}
            <span className="text-grey07 caption-m line-clamp-1">
              {item?.name}
            </span>
            {/* 제목 */}
            <h1 className="body2-m line-clamp-2">{item?.title}</h1>
            {/* 기간 */}
            <p className="caption-m text-grey09 flex">2025.03.12~03.23(토)</p>
            {/* 칩 */}
            <span className="caption-m text-grey07 flex items-center gap-1">
              상태 :
              {item?.status === 'sold out' ? (
                <EditSoldOutChip />
              ) : (
                <span className="flex flex-wrap gap-1">
                  <EditTimeChip open={item?.open} deadline={item?.deadline} />
                </span>
              )}
            </span>
          </div>
          {/* 질문 정보 */}
          <span className="caption-m text-grey07 divide-grey05 flex gap-1 divide-x">
            <p>
              응답대기 :{' '}
              <span className="text-grey11 pr-1">{item?.pending}개</span>
            </p>
            <p>
              응답완료 :{' '}
              <span className="text-grey11 pr-1">{item?.answered}개</span>
            </p>
          </span>
        </div>
        <KebabIcon
          className="flex shrink-0 cursor-pointer"
          onClick={handleEditMyItem}
        />
      </div>
      {isEditItemOpen && (
        <AdminItemBottomSheet
          itemId={item.itemId}
          isOpen={isEditItemOpen}
          setIsOpen={setIsEditItemOpen}
        />
      )}
    </li>
  );
};

export default SellerMyItem;
