// 홈 상단 내 상품 현황 컴포넌트
import { TimeChip, PeriodChip, AddButton, ToolTipBottom } from '@/components';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './statusCardSwiper.css';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
const MyProductStatus = () => {
  const navigate = useNavigate();

  //임시
  // const item = [{ id: 1 }, { id: 1 }];
  const item: [] = [];

  return (
    <section className="status-card-swiper-section flex flex-col gap-6 py-5">
      <h1 className="subhead-b px-5 text-black">내 상품 현황</h1>

      {item && item.length > 0 ? (
        <Swiper
          className="mx-5 w-full overflow-visible"
          centeredSlides={true}
          grabCursor={true}
          modules={[A11y, Navigation, Pagination]}
          spaceBetween={12}
          slidesPerView={1}
          mousewheel={true}
          navigation
          pagination={{
            clickable: true,
            renderBullet: (index: number, className: string) => {
              return `<div class="${className} custom-bullet" tabindex=${index}  ></div>`;
            },
          }}
          aria-label="내 상품 현황 슬라이드"
        >
          <SwiperSlide>
            <StatusCard />
          </SwiperSlide>
          <SwiperSlide>
            <StatusCard />
          </SwiperSlide>
        </Swiper>
      ) : (
        <section className="relative flex w-full flex-col gap-2">
          <div className="flex w-full px-5">
            <AddButton
              size="large"
              handleOnClick={() =>
                navigate(
                  `${PATH.SELLER.base}/${PATH.SELLER.item.base}/${PATH.SELLER.item.registration.base}`
                )
              }
            >
              상품 추가하기
            </AddButton>
          </div>
          <div className="relative flex w-full flex-col items-center">
            <ToolTipBottom text="상품을 먼저 등록해보세요!" />
          </div>
        </section>
      )}
    </section>
  );
};

export default MyProductStatus;

const StatusCard = () => {
  return (
    <div
      role="group"
      aria-label="상품 카드"
      className="flex w-full shrink-0 flex-col items-start gap-5 rounded bg-white p-4 shadow-[0px_0px_8px_0px_rgba(43,43,43,0.10)]"
    >
      {/* 상단 상품 정보 */}
      <article className="flex h-fit w-full items-center justify-between gap-2.5">
        {/* 좌측 상품 이미지 */}
        <img
          className="h-20 w-20 object-cover"
          src="/profile.png"
          alt="수정수정수정"
        />
        {/* 우측 상품 정보 */}
        <div className="flex h-20 flex-1 flex-col justify-between gap-[1.125rem]">
          <p className="body2-m line-clamp-2 text-black">
            단돈 40만원대로 방콕 풀패키지 여행 (초특가)로 방콕 풀패키지 여행 s
            단돈 40만원대로 방콕 풀패키지 여행 (초특가)로 방콕 풀패키지 여행 s
          </p>
          <div className="flex w-full items-start justify-between">
            <div className="flex">
              <TimeChip
                open="2025-07-01T06:34:07.837159"
                deadline="2025-07-11T06:34:07.837159"
              />
              <PeriodChip period={11} />
            </div>
            <span className="caption-m text-grey08">3일 뒤 마감</span>
          </div>
        </div>
      </article>
      {/* 하단 질문 현황 */}
      <article className="bg-grey01 flex w-full flex-col items-start gap-2.5 rounded-[.1875rem] p-4">
        {/* 질문 개수 및 오른족 화살표 */}
        <div className="flex w-full items-center justify-between">
          <div className="body2-sb flex items-center gap-1">
            <div className="bg-main h-1.5 w-1.5 rounded-full" />
            <span className="text-black">새 질문 3개</span>
            <span className="text-grey09 caption-b mx-0.5">/</span>
            <span className="text-grey08">전체 12개</span>
          </div>
          <button
            className="cursor-pointer"
            type="button"
            aria-label="질문 상세 보기"
          >
            <ArrowRightIcon />
          </button>
        </div>
        {/* 아래 흰색 박스 */}
        <div className="flex flex-col items-center justify-center self-stretch rounded-[.1875rem] bg-white p-3">
          <div className="flex w-full justify-start gap-1">
            <span className="text-sub body1-sb">#할인코드</span>
          </div>
          <div className="flex w-full justify-start gap-1">
            <span className="body1-m text-black">
              질문이 가장 많이 들어오고 있어요!
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};
