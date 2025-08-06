import { FaqCardDetailResponse } from '@/types/common/FaqCardType.types';
import { formatDate } from '@/utils/formatDate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import PinIcon from '@/assets/icon/common/Pin.svg?react';
import cn from '@/utils/cn';
import { LoadingSpinner } from '@/components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './customSwiper.css';

const ItemDetailFaqCard = ({
  faqList,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  totalElements,
}: {
  faqList: FaqCardDetailResponse[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  totalElements: number;
}) => {
  return (
    <section className="item-detail-swiper-section bg-grey01 relative flex h-fit w-full flex-col">
      <Swiper
        className="z-0 h-fit w-full"
        centeredSlides={true}
        grabCursor={true}
        modules={[A11y, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        mousewheel={true}
        navigation
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          type: 'custom',
          // this is where we force exactly totalElements bullets
          renderCustom: (_swiper, current, _loadedTotal) => {
            return Array.from({ length: totalElements })
              .map((_, idx) => {
                const isActive = idx + 1 === current;
                return `<span 
                          class="custom-bullet${isActive ? ' custom-bullet-active' : ''}" 
                          tabindex="${idx}"
                        ></span>`;
              })
              .join('');
          },
        }}
        aria-label="FAQ 슬라이드"
        onReachEnd={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      >
        {faqList.map((faq, i) => (
          <SwiperSlide
            key={faq.id ?? `placeholder-${i}`}
            role="group"
            aria-roledescription="FAQ 카드"
          >
            <article className="relative flex w-full flex-col bg-black">
              <img
                src={faq.backgroundImgLink ?? undefined}
                className={cn(
                  'h-[23.4375rem] w-full object-cover',
                  faq.adjustImg ? 'object-cover' : 'object-contain'
                )}
                role="img"
              />
            </article>
            <article className="border-grey02 bg-grey01 flex h-full w-full flex-col gap-2.5 px-5 py-2.5">
              <div className="flex w-full justify-between">
                <span className="caption-m text-grey06">
                  {formatDate({
                    date: new Date(faq.updatedAt),
                    includeWeekday: false,
                  })}
                </span>
                {faq.pinned && (
                  <PinIcon
                    className="h-[1.1984rem] w-[1.1981rem]"
                    aria-label="상단 고정"
                  />
                )}
              </div>
              <div className="flex flex-col gap-6">
                <p
                  className="body1-sb text-black"
                  id={`faq-question-${faq.id}`}
                  aria-label={`질문: ${faq.questionContent}`}
                >
                  Q. {faq.questionContent}
                </p>
                <p
                  className="body2-m text-grey11 whitespace-break-spaces"
                  id={`faq-answer-${faq.id}`}
                  aria-label={`답변: ${faq.answerContent}`}
                >
                  {faq.answerContent}
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* this empty div is where Swiper will inject our custom bullets */}
      <div className="swiper-pagination flex justify-center gap-2"></div>
      {isFetchingNextPage && (
        <div className="absolute top-0 left-0 z-[5] flex h-full w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default ItemDetailFaqCard;
