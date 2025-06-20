import { ItemDetail, ItemStatus } from '@/types/common/ItemType.types';
import { ItemDetailProfile } from '@/components';
import { useState } from 'react';
import cn from '@/utils/cn';
import DowndownArrowIcon from '@/assets/icon/common/DropdownArrow.svg?react';
import { getTimeChipText } from '@/components/user/common/Chip';
import { formatFullDateWithDay } from '@/utils/formatDate';

export const ItemDetailInfo = ({
  data,
  status,
}: {
  data: ItemDetail;
  status: ItemStatus;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="flex w-full flex-col">
      <div className="relative h-[381px] w-full bg-amber-300">
        {status === 'published' && (
          <div className="body2-sb absolute top-[.875rem] left-[.875rem] flex h-[1.6875rem] items-center justify-center rounded-[.0767rem] bg-[#45ABEB] px-[.7671rem] text-white">
            {data.itemPeriod}차 진행
          </div>
        )}

        <img
          src={data.itemImgList[0]}
          className="h-full w-full object-cover"
          decoding="async"
          role="img"
          alt="상품 대표 이미지"
        />
      </div>
      <ItemDetailProfile seller={data.sellerInfo} />
      <article className="mt-5 flex h-fit w-full flex-col gap-4 px-5">
        <div className="caption-b flex h-[1.375rem] w-fit items-center justify-center rounded-[1px] bg-[#FFEEEE] px-2.5 text-[#FF6666]">
          {getTimeChipText({ open: data.startDate, deadline: data.endDate })}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-0.5 text-black">
              <h2 className="subhead-sb">{data.itemName}</h2>
              <p className="body1-m">{data.tagline}</p>
            </div>
            <p className="body2-m text-grey08">
              {formatFullDateWithDay({ isoString: data.startDate })} ~{' '}
              {formatFullDateWithDay({
                isoString: data.startDate,
                includeYear: false,
              })}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-grey06 body2-m line-through">339,000</span>
            <div className="headline3 flex flex-wrap content-center items-center gap-1">
              <h3 className="text-[#F43232]">41% </h3>
              <h3 className="text-black">199,000 원</h3>
            </div>
          </div>
        </div>
      </article>
      <article className="border-grey02 mt-6 w-full border-t-1 px-5 pt-6">
        <p className="body1-b text-grey11">COMMENT</p>
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <p className="body2-sb text-[#45ABEB]">
            @{data.sellerInfo.instagram}님이 직접 등록한 정보예요!
          </p>
          <p
            className={cn(
              'body2-m whitespace-pre-line text-black transition-all duration-3000',
              !isExpanded && 'line-clamp-4'
            )}
          >
            {data.comment}
          </p>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            type="button"
            className="body2-m border-grey03 bg-grey01 mt-2.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[.0625rem] border px-0 py-2"
          >
            COMMENT {isExpanded ? '접기' : '더보기'}
            <DowndownArrowIcon
              className={cn(
                'h-6 w-6 shrink-0 stroke-black',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        </div>
      </article>
    </section>
  );
};
