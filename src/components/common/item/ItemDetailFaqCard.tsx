import { FAQCardList } from '@/types/common/FAQ.types';
import { formatDate } from '@/utils/formatDate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import PinIcon from '@/assets/icon/common/Pin.svg?react';
import cn from '@/utils/cn';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './customSwiper.css';

const ItemDetailFaqCard = ({ faqList }: { faqList: FAQCardList[] }) => {
  return (
    <section className="item-detail-swiper-section mb-[16.375rem] flex w-full flex-col">
      <Swiper
        className="z-0 w-full"
        centeredSlides={true}
        grabCursor={true}
        modules={[A11y, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        mousewheel={true}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index: number, className: string) => {
            return `<div class="${className} custom-bullet" tabindex=${index}  ></div>`;
          },
        }}
        aria-label="FAQ 슬라이드"
      >
        {faqList.map((faq, i) => (
          <SwiperSlide
            key={faq.id || i}
            role="group"
            aria-roledescription="FAQ 카드"
            aria-label={`${faq.faqCategory} ${i + 1}번째 FAQ`}
          >
            <article className="relative flex w-full flex-col bg-black">
              <img
                src={faq.backgroundImgLink}
                alt={`${faq.faqCategory} ${i + 1}번째 사진`}
                className={cn(
                  'h-[23.4375rem] w-full object-cover',
                  faq.adjustImg ? 'object-cover' : 'object-contain'
                )}
                role="img"
                aria-label={`${faq.faqCategory} 관련 이미지`}
              />
            </article>
            <article className="border-grey02 bg-grey01 flex w-full flex-col gap-2.5 px-5 py-2.5">
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
                  id={`faq-question-${i}`}
                  aria-label={`질문: ${faq.questionContent}`}
                >
                  Q. {faq.questionContent}
                </p>
                <p
                  className="body2-m text-grey11"
                  id={`faq-answer-${i}`}
                  aria-label={`답변: ${faq.answerContent}`}
                  aria-labelledby={`faq-question-${i} faq-answer-${i}`}
                >
                  {faq.answerContent}
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default ItemDetailFaqCard;
