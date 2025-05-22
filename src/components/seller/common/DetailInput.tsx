import { useRef, memo } from 'react';
import cn from '@/utils/cn';
import WarningIcon from '@/assets/icon/common/Warning.svg?react';
import { isValidURL } from '@/utils/validationFunction';
import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';

interface TextInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  placeHolderContent: string;
  isRequired: boolean;
}

interface LimitedTextInputProps extends TextInputProps {
  maxLength: number;
}

export const LimitedTextInput = memo(
  ({
    text,
    setText,
    maxLength,

    placeHolderContent,
  }: LimitedTextInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useAutoResizeTextArea(textareaRef, text);

    return (
      <div className="flex w-full flex-col">
        <div
          className={cn(
            'flex h-fit w-full items-center justify-center gap-2.5 rounded-sm border px-3.5 py-2.5',
            text.length > maxLength
              ? 'border-[#FF6060]'
              : 'border-grey03 focus-within:border-grey05'
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
  }
);

export const LinkInput = memo(
  ({ text, setText, placeHolderContent }: TextInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useAutoResizeTextArea(textareaRef, text);

    return (
      <div className="flex w-full flex-col">
        <div
          className={cn(
            'flex h-fit w-full items-center justify-center gap-2.5 rounded-sm border px-3.5 py-2.5',
            (!text && text.length == 0) || isValidURL(text)
              ? 'border-grey03 focus-within:border-grey05'
              : 'border-[#FF6060]'
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
        </div>
        {text && !isValidURL(text) && (
          <div className="mt-1 flex items-center space-x-1">
            <WarningIcon />
            <span className="caption-m text-[#FF6060]">
              올바른 양식으로 입력해 주세요.
            </span>
          </div>
        )}
      </div>
    );
  }
);

export const WideTextArea = memo(
  ({ text, setText, placeHolderContent }: TextInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useAutoResizeTextArea(textareaRef, text);

    return (
      <div className="flex w-full flex-col">
        <div
          className={cn(
            'focus-within:border-grey05 border-grey03 flex h-fit w-full items-center justify-center gap-2.5 rounded-sm border px-3.5 py-2.5'
          )}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeHolderContent}
            className="body2-m placeholder:text-grey06 flex-1 resize-none overflow-hidden break-keep"
            rows={7}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Enter 키 입력 방지
              }
            }}
          />
        </div>
      </div>
    );
  }
);
