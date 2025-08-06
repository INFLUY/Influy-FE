export const FirstChatBubble = ({
  profileImg,
  username,
  defaultMessage,
}: {
  profileImg: string | null;
  username: string;
  defaultMessage: string;
}) => {
  return (
    <article className="flex w-full gap-1.5 px-3">
      <div className="bg-grey03 flex h-8 w-8 items-center justify-center rounded-full">
        {profileImg && (
          <img
            className="aspect-square h-full rounded-full object-cover"
            src={profileImg}
            alt={username + '님의 프로필 사진'}
            role="img"
            aria-label={`${username}님의 프로필 사진`}
          />
        )}
      </div>
      <div className="border-grey02 bg-grey02 divide-grey03 flex w-[16.375rem] shrink-0 flex-col items-start divide-y-[.0375rem] rounded-lg border border-solid pt-3.5 pb-3">
        <p className="body2-sb w-full px-3.5 pb-2 text-[#292929]">
          {defaultMessage}
        </p>
        <div className="text-grey08 caption-m w-full px-3.5 pt-2">
          @{username}님이 직접 답변을 전송합니다.
        </div>
      </div>
    </article>
  );
};

import ReplyIcon from '@/assets/icon/common/ReplyIcon.svg?react';
import { formatIsoToKoreanLong } from '@/utils/formatDate';
import { AnswerType } from '@/types/seller/TalkBox.types';
import cn from '@/utils/cn';

interface SellerReplyBubbleProps {
  questioner: string;
  question: string;
  reply: string;
  date: string;
  onClickFaq?: () => void;
  answerType: AnswerType;
  isSellerMode: boolean;
  profileImg?: string;
}

export const SellerReplyBubble = ({
  questioner,
  question,
  reply,
  date,
  onClickFaq,
  answerType,
  isSellerMode,
  profileImg,
}: SellerReplyBubbleProps) => {
  return (
    <article
      className={cn(
        'flex w-full py-2.5',
        isSellerMode ? 'justify-end pr-5' : 'justify-start gap-1.5 pl-3'
      )}
      aria-label="답변말풍선"
    >
      {!isSellerMode && (
        <div className="bg-grey02 aspect-square h-8 w-8 shrink-0 rounded-full">
          {profileImg && (
            <img
              src={profileImg}
              alt={'인플루언서 프로필 사진'}
              className="bg-grey02 h-8 w-8 rounded-full object-cover"
            />
          )}
        </div>
      )}
      <div className="flex flex-col">
        {/* 채팅 버블 */}
        <div className="flex w-[16.375rem] flex-col">
          {/* 상단 질문 */}
          <div
            className={cn(
              'flex flex-col gap-1 rounded-t-[.75rem] px-[.875rem] py-3',
              isSellerMode ? 'bg-grey02' : 'bg-grey10'
            )}
          >
            <p className="text-grey07 caption-small-m">
              @{questioner}님의 질문
            </p>
            <div
              className={cn(
                'body2-m',
                isSellerMode ? 'text-grey08' : 'text-grey04'
              )}
            >
              <span className="font-semibold">Q. </span>
              <span>{question}</span>
            </div>
          </div>

          {/* 개별답변 */}
          <div
            className={cn(
              'flex w-full gap-1 rounded-b-[.75rem] px-2 pt-3 pb-[1.125rem]',
              isSellerMode ? 'bg-grey11' : 'bg-grey02'
            )}
          >
            <div className="h-[.8125rem] w-2">
              <ReplyIcon />
            </div>
            <div
              className={cn(
                'body2-m',
                isSellerMode ? 'text-white' : 'text-black'
              )}
            >
              <span className="text-sub font-semibold">
                {answerType === 'INDIVIDUAL' ? '개별답변 ' : '일괄 답변 '}
              </span>
              <span>{reply}</span>
            </div>
          </div>
        </div>
        {/* 날짜 */}
        <div className="text-grey08 caption-m mt-1.5">
          <p>{formatIsoToKoreanLong({ isoString: date })}</p>
        </div>

        {/* 이 답변 faq 등록하기 버튼 */}
        {isSellerMode && (
          <button
            type="button"
            className="border-grey03 body2-m mt-2.5 w-full cursor-pointer rounded-lg border py-[.5625rem] text-black"
            aria-label="이 질문 FAQ 등록하기"
            onClick={onClickFaq}
          >
            이 답변 FAQ 등록하기
          </button>
        )}
      </div>
    </article>
  );
};
