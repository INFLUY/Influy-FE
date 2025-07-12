import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import './topBannerSwiper.css';

import 'swiper/css';
import 'swiper/css/pagination';

interface TopBannerItem {
  image: string;
  onClick: () => void;
}

const TopBannerSwiper = ({ data }: { data: TopBannerItem[] }) => {
  return (
    <section className="relative h-fit w-full">
      <Swiper
        className="relative w-full"
        centeredSlides={true}
        grabCursor={true}
        modules={[A11y, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        mousewheel={true}
        pagination={{
          type: 'fraction',
        }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={item.image}
              className="w-full object-cover"
              decoding="async"
              role="img"
              alt={'상단 배너 이미지 ' + (i + 1)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default TopBannerSwiper;
