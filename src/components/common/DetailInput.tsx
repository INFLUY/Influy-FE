import { useRef } from 'react';
import cn from '@/utils/cn';
import WarningIcon from '@/assets/icon/common/Warning.svg?react';
import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';
import { isValidURL } from '@/utils/validation';

interface TextInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  placeHolderContent: string;
  isRequired?: boolean;
}

interface LimitedTextInputProps extends TextInputProps {
  maxLength: number;
}

interface IdInputProps {
  id: string;
  text: string;
  handleChange: (value: string) => void;
  placeHolderContent: string;
  maxLength: number;
  descriptionText?: string;
  errorText?: string;
  ref: React.RefObject<HTMLInputElement | null>;
}

export const TextInput = ({
  text,
  setText,
  placeHolderContent,
}: TextInputProps) => {
  const textareaRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => textareaRef.current?.focus()}
        className="border-grey03 focus-within:border-grey05 flex h-fit w-full items-center justify-center gap-2.5 rounded-xs border px-3.5 py-2.5"
      >
        <input
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeHolderContent}
          className="body2-m placeholder:text-grey06 flex-1 resize-none overflow-hidden break-keep"
        />
      </div>
    </div>
  );
};

export const LinkInput = ({
  text,
  setText,
  placeHolderContent,
}: TextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutoResizeTextArea(textareaRef, text);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => textareaRef.current?.focus()}
        className={cn(
          'flex h-fit w-full items-center justify-center gap-2.5 rounded-xs border px-3.5 py-2.5',
          (!text && text.length == 0) || isValidURL(text)
            ? 'border-grey03 focus-within:border-grey05'
            : 'border-error'
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
          <span className="caption-m text-error">
            올바른 양식으로 입력해 주세요.
          </span>
        </div>
      )}
    </div>
  );
};

export const LimitedTextInput = ({
  text,
  setText,
  maxLength,
  placeHolderContent,
}: LimitedTextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutoResizeTextArea(textareaRef, text);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => textareaRef.current?.focus()}
        className={cn(
          'flex h-fit w-full items-center justify-center gap-2.5 rounded-xs border px-3.5 py-2.5',
          text.length > maxLength
            ? 'border-error'
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
        <div className="caption-m text-grey06 h-fit">
          <span className={cn(text.length > maxLength && 'text-error')}>
            {text.length}
          </span>
          <span>/{maxLength}</span>
        </div>
      </div>
      {text.length > maxLength && (
        <div className="mt-1 flex items-center space-x-1">
          <WarningIcon />
          <span className="caption-m text-error">
            {maxLength}자 이내로 작성해주세요.
          </span>
        </div>
      )}
    </div>
  );
};

export const WideTextArea = ({
  text,
  setText,
  placeHolderContent,
}: TextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutoResizeTextArea(textareaRef, text, 6);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => textareaRef.current?.focus()}
        className={cn(
          'focus-within:border-grey05 border-grey03 flex h-fit w-full items-center justify-center gap-2.5 rounded-xs border px-3.5 py-2.5'
        )}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeHolderContent}
          className="body2-m placeholder:text-grey06 flex-1 resize-none overflow-hidden break-keep"
          rows={7}
        />
      </div>
    </div>
  );
};

export const IdInput = ({
  id,
  text,
  handleChange,
  descriptionText,
  errorText,
  maxLength,
  placeHolderContent,
  ref,
}: IdInputProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <div
        onClick={() => ref.current?.focus()}
        className={cn(
          'flex h-fit w-full items-center justify-center gap-2.5 rounded-xs border px-3.5 py-2.5',
          errorText
            ? 'border-error'
            : 'border-grey03 focus-within:border-grey05'
        )}
      >
        <input
          id={id}
          ref={ref}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeHolderContent}
          className="body2-m placeholder:text-grey06 flex-1 break-keep"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Enter 키 입력 방지
            }
          }}
        />
        <div className="caption-m text-grey06 h-fit">
          <span className={cn(text.length > maxLength && 'text-error')}>
            {text.length}
          </span>
          <span>/{maxLength}</span>
        </div>
      </div>
      {(descriptionText || errorText) && (
        <div className="flex items-center gap-1">
          {errorText && <WarningIcon className="shrink-0" />}
          <span
            className={cn(
              'caption-m',
              errorText ? 'text-error' : 'text-grey06'
            )}
          >
            {errorText || descriptionText}
          </span>
        </div>
      )}
    </div>
  );
};
