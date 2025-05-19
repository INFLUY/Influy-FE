import { useRef, useEffect } from 'react';
import cn from '@/utils/cn';
import WarningIcon from '@/assets/icon/common/Warning.svg?react';
import { LimitedTextInputProps } from './Registration.types';

export const LimitedTextInput = ({
  text,
  setText,
  maxLength,
  placeHolderContent,
}: LimitedTextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 텍스트에 맞춰 높이 설정
    }
  }, [text]);
  return (
    <div className="flex w-full flex-col">
      <div
        className={cn(
          'flex h-fit w-full items-center justify-center gap-2.5 rounded-sm border px-3.5 py-2.5',
          text.length > maxLength ? 'border-[#FF6060]' : 'border-grey03'
        )}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeHolderContent}
          className="body2-m placeholder:text-grey06 flex-1 resize-none overflow-hidden break-keep"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Enter 키 입력 방지
            }
          }}
        />
        <div className="caption-m text-grey06 h-full">
          <span className={cn(text.length > maxLength && 'text-[#FF6060]')}>
            {text.length}
          </span>
          <span>/{maxLength}</span>
        </div>
      </div>
      {text.length > maxLength && (
        <div className="mt-1 flex items-center space-x-1">
          <WarningIcon />
          <span className="caption-m text-[#FF6060]">
            {maxLength}자 이내로 작성해주세요.
          </span>
        </div>
      )}
    </div>
  );
};
