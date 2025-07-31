import Lottie from 'lottie-react';
import OnboardingLottie1 from '@/assets/lottie/onboardingLottie1.json';
import OnboardingLottie2 from '@/assets/lottie/onboardingLottie2.json';
import OnboardingLottie3 from '@/assets/lottie/onboardingLottie3.json';
import OnboardingLottie4 from '@/assets/lottie/onboardingLottie4.json';

import CheckBox from '@/assets/icon/common/CheckBox22On.svg?react';
import ScrollDownArrow from '@/assets/icon/common/ScrollDownArrow.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { useRef } from 'react';

export const OnboardingLottieSwiper = () => {
  return (
    <Swiper
      className="onboarding-swiper-section mb-2 h-full w-full"
      centeredSlides={true}
      grabCursor={true}
      modules={[A11y, Mousewheel]}
      spaceBetween={0}
      slidesPerView={1}
      direction="vertical"
      touchStartPreventDefault={true}
      mousewheel={{
        forceToAxis: true,
        releaseOnEdges: true,
      }}
      touchMoveStopPropagation={true}
      touchReleaseOnEdges={true}
      resistance={true}
      resistanceRatio={0.8}
    >
      {slideComponents.map((Component, index) => (
        <SwiperSlide key={index} className="h-full w-full pt-8">
          <Component />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Onboarding1 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-4">
      <div className="swiper-no-swiping flex w-full shrink-1 flex-col items-center justify-center gap-6">
        <p className="text-center text-2xl leading-[150%] font-bold tracking-[-0.024px] text-black">
          질문에 체계적으로
          <br />
          대응하기 힘드셨나요?
        </p>
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center text-sm leading-[150%] font-semibold tracking-[-0.014px] text-[#696969]">
          <span>중복 질문 폭주</span>
          <span>DM 누락</span>
          <span>질문 DB 축적 불가</span>
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-1 pt-1"
            aria-hidden
          >
            <div className="bg-grey04 h-[.1875rem] w-[.1875rem] rounded-full" />
            <div className="bg-grey04 h-[.1875rem] w-[.1875rem] rounded-full" />
            <div className="bg-grey04 h-[.1875rem] w-[.1875rem] rounded-full" />
          </div>
        </div>
      </div>
      <Lottie
        className="mx-5 h-fit w-fit shrink-0 overflow-hidden rounded-xl"
        animationData={OnboardingLottie1}
        loop={true}
      />
      <div className="body1-sb text-grey11 flex flex-1 flex-col items-center justify-between gap-[.3125rem]">
        <p>
          INFLUY 톡박스는 <span className="text-sub">AI</span>로 이 모든 것을
          해결해요!
        </p>
        <ScrollDownArrow />
      </div>
    </div>
  );
};

const Onboarding2 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <p className="text-center text-2xl leading-[150%] font-bold tracking-[-0.024px] text-black">
          문의 응대 시간은 줄이고,
          <br />
          판매에 집중하세요.
        </p>
        <div className="body2-sb text-grey10 flex h-full w-fit flex-col justify-center gap-4">
          <div className="flex gap-2.5">
            <CheckBox className="text-sub" />
            <span>AI로 비슷한 질문 분류</span>
          </div>
          <div className="flex gap-2.5">
            <CheckBox className="text-sub" />
            <span>일괄 답변 가능</span>
          </div>
        </div>
      </div>
      <Lottie
        className="mx-5 overflow-hidden rounded-xl"
        animationData={OnboardingLottie2}
        loop={true}
      />
      <div className="flex flex-1 flex-col items-center justify-end gap-[.3125rem]">
        <ScrollDownArrow />
      </div>
    </div>
  );
};

const Onboarding3 = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = headerRef.current;
    if (!el) return;

    const isAtTop = el.scrollTop <= 10;

    if (!isAtTop) {
      e.stopPropagation();
    }
  };
  return (
    <div className="flex h-full w-full">
      <div
        className="scrollbar-hide flex w-full flex-col items-center justify-between gap-21 overflow-auto pb-20"
        ref={headerRef}
        onTouchMove={handleTouchMove}
      >
        <div className="flex w-full flex-col items-center justify-center gap-7">
          <p className="headline3 text-center font-bold text-black">
            인플루언서가 아닌 유저들은 <br />
            채팅방에서 답변을 받은 것으로 보여요!
          </p>
          <Lottie
            className="mx-5 overflow-hidden rounded-xl"
            animationData={OnboardingLottie3}
            loop={true}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-7">
          <p className="headline3 text-center font-bold text-black">
            물론, 톡박스를 자유롭게 <br />
            활성화/비활성화할 수도 있어요.
          </p>
          <Lottie
            className="mx-5 overflow-hidden rounded-xl"
            animationData={OnboardingLottie4}
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

const slideComponents = [Onboarding1, Onboarding2, Onboarding3];
