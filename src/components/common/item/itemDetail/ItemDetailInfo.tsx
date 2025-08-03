import { ItemDetail } from '@/types/common/ItemType.types';
import { ItemDetailProfile, TimeChip } from '@/components';
import { RefObject, useState } from 'react';
import cn from '@/utils/cn';
import DowndownArrowIcon from '@/assets/icon/common/DropdownArrow.svg?react';
import { formatFullDateWithDay } from '@/utils/formatDate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import './customSwiper.css';

import 'swiper/css';
import 'swiper/css/navigation';

export const ItemDetailInfo = ({
  data,
  ref,
}: {
  data: ItemDetail;
  ref: RefObject<HTMLElement | null>;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const discountRate =
    data.salePrice &&
    data.regularPrice &&
    Math.round(
      ((data.regularPrice - data.salePrice) / data.regularPrice) * 100
    );
  return (
    <section
      className="item-detail-swiper-section flex w-full flex-col pb-[.6875rem]"
      ref={ref}
    >
      <div className="relative h-[23.8125rem] w-full">
        {data.itemImgList && (
          <Swiper
            className="z-0 h-full"
            centeredSlides={true}
            grabCursor={true}
            modules={[A11y, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            mousewheel={true}
            navigation
            onSlideChange={(swiper) => setCurrentImgIndex(swiper.realIndex)}
          >
            {data.itemImgList.map((img, i) => (
              <SwiperSlide key={i} className="z-0 h-full">
                <img
                  src={img}
                  className="h-full w-full object-cover"
                  decoding="async"
                  role="img"
                  alt={'상품 이미지 ' + (i + 1)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* 진행 회차 뱃지 */}
        {data.itemPeriod && data.itemPeriod > 1 && (
          <div className="body2-sb bg-grey10 absolute top-0 left-0 z-1 flex h-[1.6875rem] items-center justify-center rounded-[.0767rem] px-[.7671rem] text-white">
            {data.itemPeriod}차
          </div>
        )}
        {data.itemImgList && data.itemImgList.length > 1 && (
          <div className="body2-r absolute right-5 bottom-5 z-1 flex h-7 w-[3.25rem] items-center justify-center gap-2.5 rounded-[.1875rem] bg-[rgba(0,0,0,0.40)] py-[.1875rem] text-[#D6D6D6]">
            {currentImgIndex + 1} / {data.itemImgList.length}
          </div>
        )}
      </div>
      {/* <ItemDetailProfile seller={data.sellerInfo} /> */}
      <article className="border-grey02 mt-5 flex h-fit w-full flex-col gap-4 border-b-1 px-5 pb-6">
        {/* Time chip */}
        {data.startDate && data.endDate ? (
          <TimeChip open={data.startDate} deadline={data.endDate} />
        ) : (
          <div className="caption-b flex h-[1.375rem] w-fit items-center justify-center rounded-[.0625rem] bg-[#FFEEEE] px-2.5 text-[#FF6666]">
            임시(디자인 수정 필요)
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-0.5 text-black">
              {/* 상품 이름 */}
              <h2 className="subhead-sb">{data.itemName}</h2>
              {/* 한줄소개 */}
              {data.tagline && <p className="body1-m">{data.tagline}</p>}
            </div>
            {(data.startDate || data.endDate) && (
              <p className="body2-m text-grey08">
                {data.startDate &&
                  formatFullDateWithDay({ isoString: data.startDate })}{' '}
                ~{' '}
                {data.endDate &&
                  (data.startDate
                    ? formatFullDateWithDay({
                        isoString: data.endDate,
                        includeYear: false,
                      })
                    : formatFullDateWithDay({
                        isoString: data.endDate,
                      }))}
              </p>
            )}
          </div>

          {/* 가격 */}
          {data.regularPrice && (
            <div className="flex flex-col items-start">
              {data.salePrice && (
                <span className="text-grey06 body2-m line-through">
                  {data.regularPrice.toLocaleString()}
                </span>
              )}

              <div className="headline3 flex flex-wrap content-center items-center gap-1">
                {data.salePrice && (
                  <h3 className="text-main">{discountRate}% </h3>
                )}
                <h3 className="text-black">
                  {data.salePrice?.toLocaleString() ??
                    data.regularPrice.toLocaleString()}
                  원
                </h3>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* comment */}
      {data.comment && (
        <article className="w-full px-5 pt-6">
          <p className="body1-b text-grey11">COMMENT</p>
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            {/* <p className="body2-sb text-sub">
              @{data.sellerInfo.instagram}님이 직접 등록한 정보예요!
            </p> */}
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
              className="body2-m border-grey03 bg-grey01 mt-1.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[.0625rem] border px-0 py-2"
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
      )}
    </section>
  );
};

export default ItemDetailInfo;
