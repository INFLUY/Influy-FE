import { useRef, useMemo, useEffect, useState } from 'react';
import cn from '@/utils/cn';
import WarningIcon from '@/assets/icon/common/Warning.svg?react';
import { isValidURL } from '@/utils/validation';
import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';

interface TextInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  placeHolderContent: string;
  isRequired?: boolean;
}

interface LimitedTextInputProps extends TextInputProps {
  maxLength: number;
}

interface PriceInputProps {
  price?: number;
  setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const TextInput = ({
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
        className="border-grey03 focus-within:border-grey05 flex h-fit w-full items-center justify-center gap-2.5 rounded-sm border px-3.5 py-2.5"
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
          'flex h-fit w-full items-center justify-center gap-2.5 rounded-sm border px-3.5 py-2.5',
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
        <div className="caption-m text-grey06 h-full">
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
          'flex h-fit w-full items-center justify-center gap-2.5 rounded-sm border px-3.5 py-2.5',
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

export const WideTextArea = ({
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
        />
      </div>
    </div>
  );
};

export const PriceInput = ({ price, setPrice }: PriceInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [inputWidth, setInputWidth] = useState<number>(50); // 최소 너비

  // 숫자 세개마다 컴마
  const formattedPrice = useMemo(() => {
    if (price === undefined) return '';
    return price.toLocaleString();
  }, [price]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, '');

    // 자리수 제한
    if (rawValue.length > 12) {
      return;
    }

    const numericValue = rawValue === '' ? undefined : Number(rawValue);
    setPrice(numericValue);
  };

  //input width 조절
  useEffect(() => {
    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setInputWidth(spanWidth + 12);
    }
  }, [formattedPrice]);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="border-grey03 focus-within:border-grey05 flex h-fit items-center justify-start rounded-sm border px-[.8125rem] py-2.5"
    >
      <input
        ref={inputRef}
        value={formattedPrice}
        type="text"
        inputMode="numeric"
        onChange={handleChange}
        placeholder="정가를 입력해 주세요."
        className="body2-m placeholder:text-grey06 overflow-hidden break-keep outline-none"
        style={{ width: `${inputWidth}px` }}
      />
      {price && <span className="body2-m">원</span>}

      {/* 숨겨진 span으로 width 측정 */}
      <span ref={spanRef} className="body2-m invisible absolute whitespace-pre">
        {formattedPrice || '정가를 입력해 주세요.'}
      </span>
    </div>
  );
};
