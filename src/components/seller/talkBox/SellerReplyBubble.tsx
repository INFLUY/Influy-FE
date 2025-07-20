import cn from '@/utils/cn';
import ReplyIcon from '@/assets/icon/common/ReplyIcon.svg?react';

interface SellerReplyBubbleProps {
  questioner: string;
  question: string;
  reply: string;
  date: string;
}

const SellerReplyBubble = ({
  questioner,
  question,
  reply,
  date,
}: SellerReplyBubbleProps) => {
  return (
    <article
      className="flex w-full flex-col items-end gap-1.5 py-2.5 pr-5 pl-[5.875rem]"
      aria-label="답변말풍선"
    >
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

      <div className="text-grey08 caption-m">
        <p>{date}</p>
      </div>
    </article>
  );
};

export default SellerReplyBubble;
