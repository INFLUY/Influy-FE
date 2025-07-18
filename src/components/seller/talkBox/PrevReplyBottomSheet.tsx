import { useRef, useState } from 'react';
import ArrowIcon from '@/assets/icon/common/ArrowRight12.svg?react';
import cn from '@/utils/cn';

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './talkBoxSwiper.css';

interface Answer {
  id: number;
  content: string;
}

interface Props {
  answers: Answer[];
  onSelect: (prevAnswer: string) => void;
}

const PrevReplyBottomSheet = ({
  handleAnswerSelect,
}: {
  handleAnswerSelect: (prevAnswer: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleBarRef = useRef<HTMLDivElement | null>(null);

  // 바텀시트 제스쳐 적용 필요

  return (
    <section
      ref={handleBarRef}
      className="bg-sub-light w-full overflow-hidden rounded-[.75rem_.75rem_0rem_0rem] shadow-[0rem_.25rem_1.125rem_0rem_rgba(0,0,0,0.25)]"
    >
      {/* 손잡이 */}
      <div className="flex w-full cursor-pointer justify-center pt-2 pb-3">
        <div className="h-1 w-12 rounded-[.125rem] bg-[rgba(23,23,27,0.10)]" />
      </div>

      {/* 이전 답변 안내 */}
      <article className="mb-4 flex w-full items-start justify-between px-4">
        <div className="flex flex-col text-[#242424]">
          <span className="body1-b">이전 답변을 다시 사용하세요!</span>
          <div className="flex gap-0.5">
            <span className="body2-sb text-sub">#연속 예약</span>
            <span className="body2-m text-grey10">
              에 남겼던 모든 답변들을 저장해뒀어요.
            </span>
          </div>
        </div>
        <ArrowIcon
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'text-grey07 flex h-3.5 w-3.5 shrink-0 cursor-pointer items-center justify-center',
            isOpen ? '-rotate-90' : 'rotate-90'
          )}
        />
      </article>

      {/* 이전 답변 목록 */}
      {isOpen && (
        <div className="talk-box-swiper-section">
          <Swiper
            spaceBetween={12} // 카드 간격
            slidesPerView={1.04} // 카드 크기 기반으로 자동
            centeredSlides={false}
            className="w-full !px-4"
            modules={[A11y, Pagination]}
            grabCursor={true}
            pagination={{
              clickable: true,
              renderBullet: (index: number, className: string) => {
                return `<div class="${className} custom-bullet mt-[1.125rem]" tabindex=${index}  ></div>`;
              },
            }}
          >
            {dummyAnswers &&
              dummyAnswers.map((answer) => (
                <SwiperSlide key={answer.id}>
                  <article className="bg-grey01 flex h-[9.125rem] w-full shrink-0 flex-col items-end justify-between gap-2.5 rounded-[.3125rem] p-3">
                    <p className="caption-m line-clamp-5 text-black">
                      {answer.content}
                    </p>
                    <button
                      className="caption-m bg-grey11 cursor-pointer rounded-[.1875rem] px-2.5 py-1 text-white"
                      onClick={() => handleAnswerSelect(answer.content)}
                    >
                      이 답변 사용
                    </button>
                  </article>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default PrevReplyBottomSheet;

const dummyAnswers = [
  {
    id: 1,
    content:
      '말씀하신 블랙 컬러와 실제로 비교해보면, 이 제품은 아주 딥한 네이비 색상이에요 :) 거의 블랙에 가까운 어두운 남색이라서.말씀하신 블랙 컬러와 실제로 비교해보면, 이 제품은 아주 딥한 네이비 색상이에요 :) 거의 블랙에 가까운 어두운 남색이라서. 말씀하신 블랙 컬러와 실제로 비교해보면, 이 제품은 아주 딥한 네이비 색상이에요 :) 거의 블랙에 가까운 어두운 남색이라서. ',
  },
  {
    id: 2,
    content:
      '실내 조명이나 자연광에 따라 블랙처럼 보이기도 하고 살짝 푸른빛이 도는 느낌도 있어요! 구매에 참고가 되셨길 바라요🙏🏻💙',
  },
];
