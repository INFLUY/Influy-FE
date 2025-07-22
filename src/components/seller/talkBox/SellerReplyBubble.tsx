import ReplyIcon from '@/assets/icon/common/ReplyIcon.svg?react';

interface SellerReplyBubbleProps {
  questioner: string;
  question: string;
  reply: string;
  date: string;
  onClickFaq: () => void;
}

const SellerReplyBubble = ({
  questioner,
  question,
  reply,
  date,
  onClickFaq,
}: SellerReplyBubbleProps) => {
  return (
    <article
      className="flex w-full flex-col items-end py-2.5 pr-5 pl-[5.875rem]"
      aria-label="답변말풍선"
    >
      {/* 채팅 버블 */}
      <div className="flex w-full flex-col">
        {/* 상단 질문 */}
        <div className="bg-grey02 flex flex-col gap-1 rounded-t-[.75rem] px-[.875rem] py-3">
          <p className="text-grey07 caption-small-m">{questioner}님의 질문</p>{' '}
          <div className="text-grey08 body2-m">
            <span className="font-semibold">Q. </span>
            <span>{question}</span>
          </div>
        </div>

        {/* 개별답변 */}
        <div className="bg-grey11 flex w-full gap-1 rounded-b-[.75rem] px-2 pt-3 pb-[1.125rem]">
          <div className="h-[13px] w-2">
            <ReplyIcon className="" />
          </div>
          <div className="body2-m text-white">
            <span className="text-sub font-semibold">개별답변 </span>
            <span>{reply}</span>
          </div>
        </div>
      </div>
      {/* 날짜 */}
      <div className="text-grey08 caption-m mt-1.5">
        <p>{date}</p>
      </div>

      {/* 이 답변 faq 등록하기 버튼 */}
      <button
        type="button"
        className="border-grey03 body2-m mt-2.5 w-full rounded-lg border py-[.5625rem] text-black"
        aria-label="이 질문 FAQ 등록하기"
        onClick={onClickFaq}
      >
        이 답변 FAQ 등록하기
      </button>
    </article>
  );
};

export default SellerReplyBubble;
