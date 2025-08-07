import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Autoplay } from 'swiper/modules';
import './topBannerSwiper.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { TopBannerItem } from '@/pages/user/home/HomePage';
import { useNavigate } from 'react-router-dom';

const TopBannerSwiper = ({ data }: { data: TopBannerItem[] }) => {
  const navigate = useNavigate();

  const handleBannerClick = (path: string) => {
    if (!path) return;

    if (/^https?:\/\//.test(path)) {
      // 외부 링크는 새 창으로 열기
      window.open(path, '_blank');
    } else {
      // 내부 경로는 navigate 사용
      navigate(path);
    }
  };

  return (
    <section className="relative aspect-square h-fit w-full">
      <Swiper
        className="relative w-full"
        centeredSlides={false}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[A11y, Pagination, Autoplay]}
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
              onClick={() => handleBannerClick(item.path)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default TopBannerSwiper;
