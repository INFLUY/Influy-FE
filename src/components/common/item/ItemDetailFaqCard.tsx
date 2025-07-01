import { FAQCardList } from '@/types/common/FAQ.types';
import { formatDate } from '@/utils/formatDate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import PinIcon from '@/assets/icon/common/Pin.svg?react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './customSwiper.css';

const ItemDetailFaqCard = ({ faqList }: { faqList: FAQCardList[] }) => {
  return (
    <section className="mb-[16.375rem] flex w-full flex-col">
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
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
      >
        {faqList.map((faq, i) => (
          <SwiperSlide>
            <article className="relative flex w-full flex-col">
              <img
                src={faq.backgroundImgLink}
                alt={faq.faqCategory + ' ' + (i + 1) + '번째 사진'}
                className="h-[23.4375rem] w-full object-cover"
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
                  <PinIcon className="h-[1.1984rem] w-[1.1981rem]" />
                )}
              </div>
              <div className="flex flex-col gap-6">
                <p
                  className="body1-sb text-black"
                  aria-label={faq.faqCategory + ' ' + (i + 1) + '번째 질문'}
                >
                  Q. {faq.questionContent}
                </p>
                <p
                  className="body2-m text-grey11"
                  aria-label={faq.faqCategory + ' ' + (i + 1) + '번째 답변'}
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
