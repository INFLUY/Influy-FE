// 홈 상단 내 상품 현황 컴포넌트
import { TimeChip, PeriodChip } from '@/components';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight.svg?react';
const MyProductStatus = () => {
  return (
    <section className="flex flex-col gap-4 p-5">
      <h1 className="subhead-b text-black">내 상품 현황</h1>
      <div>
        <StatusCard />
      </div>
    </section>
  );
};

export default MyProductStatus;

const StatusCard = () => {
  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-5 rounded bg-white p-4 shadow-[0px_0px_8px_0px_rgba(43,43,43,0.10)]">
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
          <button className="cursor-pointer" type="button">
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
