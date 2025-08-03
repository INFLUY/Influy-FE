// 홈 상단 내 상품 현황 컴포넌트
import { TimeChip, PeriodChip, AddButton, ToolTip } from '@/components';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { SellerHomeItemStatus } from '@/types/common/ItemType.types';
import { getDday } from '@/utils/formatDate';

const MyProductStatus = ({ items }: { items: SellerHomeItemStatus[] | [] }) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="subhead-b px-5 text-black">내 상품 현황</h1>

      {items && items.length > 0 ? (
        <ul className="flex flex-col gap-5 px-5">
          {items.map((item) => (
            <StatusCard key={item.itemId} item={item} />
          ))}
        </ul>
      ) : (
        <section className="relative flex w-full flex-col gap-2">
          <div className="flex w-full px-5">
            <AddButton
              size="large"
              handleOnClick={() =>
                navigate(
                  `${PATH.SELLER.BASE}/${PATH.SELLER.ITEM.BASE}/${PATH.SELLER.ITEM.REGISTRATION.BASE}`
                )
              }
            >
              상품 추가하기
            </AddButton>
          </div>
          <div className="relative flex w-full flex-col items-center">
            <ToolTip
              text="상품을 먼저 등록해보세요!"
              position="center"
              direction="bottom"
            />
          </div>
        </section>
      )}
    </section>
  );
};

export default MyProductStatus;

const StatusCard = ({ item }: { item: SellerHomeItemStatus }) => {
  return (
    <li
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
          <p className="body2-m line-clamp-2 flex h-full items-center text-black">
            {item.itemTitle}
          </p>
          <div className="flex w-full items-start justify-between">
            <div className="flex">
              <PeriodChip period={item.itemPeriod} />
              <TimeChip open={item.startDate} deadline={item.endDate} />
            </div>
            <span className="caption-m text-grey08">{`${getDday(new Date(item.endDate))}일 뒤 마감`}</span>
          </div>
        </div>
      </article>
      {/* 하단 질문 현황 */}
      <article className="bg-grey01 flex w-full flex-col items-start gap-2.5 rounded-[.1875rem] p-4">
        {/* 질문 개수 및 오른족 화살표 */}
        <div className="flex w-full items-center justify-between">
          <div className="body2-sb flex items-center gap-1">
            {item.newQuestions > 0 && (
              <div className="bg-main h-1.5 w-1.5 rounded-full" />
            )}
            <span className="text-black">새 질문 {item.newQuestions}개</span>
            <span className="text-grey09 caption-b mx-0.5">/</span>
            <span className="text-grey08">
              전체 {item.totalPendingQuestions}개
            </span>
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
        {(item.topCategories || []).length > 0 ? (
          <div className="flex h-[4.5rem] w-full flex-col justify-center gap-1 rounded-[.1875rem] bg-white p-3">
            <div className="text-sub body1-sb line-clamp-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {(item.topCategories || [])
                .map((category) => `#${category}`)
                .join(' ')}
            </div>
            <span className="body1-m text-black">
              질문이 가장 많이 들어오고 있어요!
            </span>
          </div>
        ) : (
          <div className="body1-m text-grey08 flex h-[4.5rem] w-full rounded-[.1875rem] bg-white p-3">
            아직 들어온 질문이 없어요!
          </div>
        )}
      </article>
    </li>
  );
};
