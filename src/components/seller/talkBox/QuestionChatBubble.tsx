import ArrowRight from '@/assets/icon/common/ArrowRight16.svg?react';
import CheckOn from '@/assets/icon/common/CheckCircleOn.svg?react';
import CheckOff from '@/assets/icon/common/CheckCircleOff.svg?react';
import { useSelectModeStore } from '@/store/talkBoxStore';
import cn from '@/utils/cn';
import { formatIsoToTimeOrDate } from '@/utils/formatDate';
import { QuestionDTO } from '@/types/seller/TalkBox.types';
import { useState } from 'react';

interface SellerChatBubbleProps {
  chat: QuestionDTO;
  onSelectSingle?: (chat: QuestionDTO) => void;
  onDelete?: () => void;
}

const QuestionChatBubble = ({
  chat,
  onSelectSingle,
  onDelete,
}: SellerChatBubbleProps) => {
  const { mode, selectedQuestions, setSelectedQuestions } =
    useSelectModeStore();

  const [isLongPressChat, setIsLongPressChat] = useState<boolean | null>(null);

  const isSelected = selectedQuestions.some(
    (q) => q.questionId === chat.questionId
  );

  const handleCheckboxClick = () => {
    if (mode !== 'select') return;
    if (isSelected) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== chat));
    } else {
      setSelectedQuestions([...selectedQuestions, chat]);
    }
  };

  // 길게 눌러서 선택하기
  let pressTimer: ReturnType<typeof setTimeout>;

  const startPress = () => {
    if (mode !== 'single') return;
    pressTimer = setTimeout(() => {
      setIsLongPressChat(true); // 부모로 알림
    }, 600); // 0.6초 이상 누르면 롱프레스
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(chat.content);
    setIsLongPressChat(false);
  };

  return (
    <>
      <article
        className={cn(
          'grid w-full grid-cols-[1fr_auto] items-start gap-x-2.5 gap-y-1 px-5 select-none',
          mode === 'single'
            ? 'grid-rows-[auto_auto_auto]'
            : 'grid-rows-[auto_auto]',
          {
            'z-70': isLongPressChat,
          }
        )}
        role="group"
        aria-roledescription="채팅 말풍선"
        aria-label={`질문자 ${chat.username}의 채팅 말풍선, 카테고리: ${chat.tagName}`}
      >
        {/* 상단 유저 및 시간 */}
        <div className="col-span-1 col-start-1 row-span-1 row-start-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-grey03 flex h-8 w-8 items-center justify-center rounded-full">
              {chat.profileImg && (
                <img
                  className="aspect-square h-full object-cover"
                  src={chat.profileImg}
                  alt={chat.username + '님의 프로필 사진'}
                  role="img"
                  aria-label={`${chat.username}님의 프로필 사진`}
                />
              )}
            </div>
            <span
              className="body2-m text-grey10"
              aria-label={`질문자: ${chat.username}`}
            >
              {chat.username}
            </span>
            <div
              className="bg-sub-light text-grey09 caption-m rounded-[.1875rem] px-1.5 py-0.5"
              aria-label={`질문 횟수: ${chat.nthQuestion}회`}
            >
              {chat.nthQuestion}회질문
            </div>
          </div>
          <span
            className="caption-m text-grey08"
            aria-label={`질문 등록일: ${formatIsoToTimeOrDate(chat.createdAt)}`}
          >
            {formatIsoToTimeOrDate(chat.createdAt)}
          </span>
        </div>

        {/* 말풍선 */}
        <div
          onClick={() => handleCheckboxClick()}
          className={cn(
            'border-grey02 bg-grey02 body2-m relative col-span-1 col-start-1 row-span-1 row-start-2 ml-10 flex h-fit shrink-0 flex-col items-end gap-1 rounded-lg border border-solid px-[.875rem] pt-2 pb-2.5 transition-all duration-50',
            (mode === 'select' || mode === 'bulk-reply') &&
              isSelected &&
              'bg-grey03 border-black',
            {
              'shadow-[0rem_.25rem_1.125rem_0rem_rgba(0,0,0,0.25)]':
                isLongPressChat,
            },
            {
              'cursor-pointer': mode !== 'bulk-reply',
            }
          )}
          role="region"
          aria-label={`질문 내용: ${chat.content}`}
          aria-checked={mode === 'select' ? isSelected : undefined}
          tabIndex={0}
          onMouseDown={startPress}
          onMouseUp={cancelPress}
          onMouseLeave={cancelPress}
          onTouchStart={startPress}
          onTouchEnd={cancelPress}
        >
          <p
            className="text-sub w-full"
            aria-label={`카테고리: ${chat.tagName}`}
          >
            #{chat.tagName}
          </p>
          {chat.new && (
            <div
              className="bg-main absolute top-3 right-3 h-1.5 w-1.5 rounded-full"
              aria-label="새로운 질문"
            />
          )}
          <p
            className="line-clamp-4 w-full text-left text-[#292929]"
            aria-label={`질문 본문: ${chat.content}`}
          >
            {chat.content}
          </p>
        </div>
        {/* 우측 화실표 및 체크박스 */}
        <div
          className={cn(
            'col-start-2 row-start-2 flex h-full w-6 items-center justify-end',
            {
              'cursor-pointer': mode !== 'bulk-reply',
            }
          )}
        >
          {mode === 'default' ? (
            <ArrowRight
              className="text-grey06"
              aria-label="개별 답변"
              onClick={() => onSelectSingle?.(chat)}
            />
          ) : (mode === 'select' || mode === 'bulk-reply') && isSelected ? (
            <CheckOn
              className="h-6 w-6"
              onClick={() => handleCheckboxClick()}
              aria-label="선택됨"
            />
          ) : mode === 'select' && !isSelected ? (
            <CheckOff
              className="h-6 w-6"
              onClick={() => handleCheckboxClick()}
              aria-label="선택 안 됨"
            />
          ) : null}
        </div>

        {mode === 'single' && isLongPressChat && (
          <div className="row-span-1 row-start-3 mt-3 ml-10 flex flex-1 flex-col gap-[.5625rem] transition-all duration-100">
            <button
              type="button"
              className="border-grey03 body2-m w-full items-center justify-center rounded-[.1875rem] border bg-white px-3 py-[.625rem] text-center text-black shadow-[0rem_.25rem_1.125rem_0rem_rgba(0,0,0,0.25)]"
              aria-label="복사"
              onClick={handleCopy}
            >
              복사
            </button>
            <button
              type="button"
              className="border-grey03 body2-m text-error w-full items-center justify-center rounded-[.1875rem] border bg-white px-3 py-[.625rem] text-center shadow-[0rem_.25rem_1.125rem_0rem_rgba(0,0,0,0.25)]"
              aria-label="삭제"
              onClick={onDelete}
            >
              삭제
            </button>
          </div>
        )}
      </article>
      {mode === 'single' && (
        <div
          className={cn(
            'fixed inset-0 z-60 flex items-center justify-center backdrop-blur-[.9375rem] transition-all duration-100',
            isLongPressChat
              ? 'pointer-events-auto bg-white/20 opacity-100'
              : 'pointer-events-none bg-white/0 opacity-0'
          )}
          onClick={() => setIsLongPressChat(false)}
        />
      )}
    </>
  );
};

export default QuestionChatBubble;
