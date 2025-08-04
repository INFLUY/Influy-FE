import { formatIsoToKoreanLong } from '@/utils/formatDate';

export const UserChatBubbleUserView = ({ date }: { date: string }) => {
  return (
    <article
      className="flex w-full flex-col items-end py-2.5 pr-5 pl-[5.875rem]"
      aria-label="답변말풍선"
    >
      <div
        className="bg-grey11 body2-m flex w-full flex-col gap-1 rounded-[.75rem] px-[.875rem] pt-2 pb-2.5"
        aria-label="질문 말풍선"
      >
        <p className="text-sub">[색상]</p>
        <p className="text-white">
          네이비 색상 옷 구매하려고 하는데요, 세탁할 때 물빠짐이 많이 심한
          편인가요
        </p>
      </div>
      {/* 날짜 */}
      <div className="text-grey08 caption-m mt-1.5">
        <p>{formatIsoToKoreanLong({ isoString: date })}</p>
      </div>
    </article>
  );
};
