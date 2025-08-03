import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';
import { useRef } from 'react';
import SendIcon from '@/assets/icon/common/SendIcon.svg?react';
import cn from '@/utils/cn';

const ChatBarTextArea = ({
  text,
  setText,
  handleReplySubmit,
  isItemOpened,
}: {
  text: string;
  setText: (value: string) => void;
  handleReplySubmit: () => void;
  isItemOpened?: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutoResizeTextArea(textareaRef, text);

  return (
    <section className="border-t-grey02 flex w-full items-end gap-2.5 border-t bg-white px-2.5 py-3">
      <textarea
        ref={textareaRef}
        className="bg-grey02 body2-m scrollbar-hide text-grey10 placeholder:text-grey07 flex max-h-[7.875rem] flex-[1_0_0] resize-none items-center rounded-[1.25rem] px-3.5 py-2.5"
        placeholder={
          isItemOpened ? '답변 메세지 입력' : '톡박스가 비활성화 상태입니다.'
        }
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!isItemOpened}
      />
      <div className="flex h-[2.5625rem] items-center">
        <SendIcon
          role="button"
          className={cn(
            'h-6 w-6',
            text.length > 0 && text.trim().length !== 0
              ? 'cursor-pointer text-black'
              : 'text-grey06'
          )}
          onClick={handleReplySubmit}
          tabIndex={0}
        />
      </div>
    </section>
  );
};
export default ChatBarTextArea;
