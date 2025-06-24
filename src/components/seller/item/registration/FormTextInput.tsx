import { useFormContext, useController } from 'react-hook-form';
import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';
import cn from '@/utils/cn';
import WarningIcon from '@/assets/icon/common/Warning.svg?react';
import { ItemFormValues } from '@/types/item.types';
import { useRef, useMemo, useEffect, useState } from 'react';

interface FormLimitedTextInputProps {
  name: keyof ItemFormValues; // 폼 필드 이름 ('titleText' 같은 것)
  maxLength: number;
  placeHolderContent: string;
  ref?: React.RefObject<HTMLDivElement>;
  tabIndex?: number;
}

interface FormInputProps {
  name: keyof ItemFormValues;
}

export const FormLimitedTextInput = ({
  name,
  maxLength,
  placeHolderContent,
}: FormLimitedTextInputProps) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutoResizeTextArea(textareaRef, value);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => textareaRef.current?.focus()}
        className={cn(
          'flex h-fit w-full items-start justify-center gap-2.5 rounded-[.125rem] border px-3.5 py-2.5',
          value.length > maxLength || error
            ? 'border-error'
            : 'border-grey03 focus-within:border-grey05'
        )}
      >
        <textarea
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
          value={value}
          onChange={onChange}
          placeholder={placeHolderContent}
          className="body2-m placeholder:text-grey06 flex-1 resize-none overflow-hidden break-keep"
          rows={1}
        />
        <div className="caption-m text-grey06 flex h-[1.3125rem] items-center">
          <span
            className={cn((value.length > maxLength || error) && 'text-error')}
          >
            {value.length}
          </span>
          <span>/{maxLength}</span>
        </div>
      </div>
      {(error || value.length > maxLength) && (
        <div className="mt-1 flex items-center space-x-1">
          <WarningIcon />
          <span className="caption-m text-error">
            {error?.message?.toString() ||
              `${maxLength}자 이내로 작성해주세요.`}
          </span>
        </div>
      )}
    </div>
  );
};

export const FormWideTextArea = ({ name }: { name: string }) => {
  const { control } = useFormContext();

  const {
    field: { value: text, onChange, ref },
  } = useController({
    name,
    control,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutoResizeTextArea(textareaRef, text);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => textareaRef.current?.focus()}
        className={cn(
          'focus-within:border-grey05 border-grey03 flex h-fit w-full items-center justify-center gap-2.5 rounded-xs border px-3.5 py-2.5'
        )}
      >
        <textarea
          ref={(e) => {
            textareaRef.current = e;
            ref(e);
          }}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="제품 선택 이유, 특징, 사용 경험 등 제품의 매력을 보여줄 수 있는 내용을 자유롭게 작성해 주세요."
          className="body2-m placeholder:text-grey06 flex-1 resize-none overflow-hidden break-keep"
          rows={7}
        />
      </div>
    </div>
  );
};

export const FormLinkInput = ({ name }: FormInputProps) => {
  const { control } = useFormContext();

  const {
    field: { value: text, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutoResizeTextArea(textareaRef, text);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => textareaRef.current?.focus()}
        className={cn(
          'flex h-fit w-full items-center justify-center gap-2.5 rounded-xs border px-3.5 py-2.5',
          error ? 'border-error' : 'border-grey03 focus-within:border-grey05'
        )}
      >
        <textarea
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://"
          className="body2-m placeholder:text-grey06 flex-1 resize-none overflow-hidden break-keep"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Enter 키 입력 방지
            }
          }}
        />
      </div>
      {error && (
        <div className="mt-1 flex items-center space-x-1">
          <WarningIcon />
          <span className="caption-m text-error">
            {error?.message?.toString()}
          </span>
        </div>
      )}
    </div>
  );
};

export const FormPriceInput = ({ name }: FormInputProps) => {
  const { control } = useFormContext();

  const {
    field: { value: price, onChange, ref },
    // fieldState: { error },
  } = useController({
    name,
    control,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [inputWidth, setInputWidth] = useState<number>(50); // 최소 너비

  // 숫자 세개마다 컴마
  const formattedPrice = price === undefined ? '' : price.toLocaleString();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, '');

    // 자리수 제한
    if (rawValue.length > 12) {
      return;
    }

    const numericValue = rawValue === '' ? undefined : Number(rawValue);
    onChange(numericValue);
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
      className="border-grey03 focus-within:border-grey05 flex h-fit w-full items-center justify-start rounded-xs border px-[.8125rem] py-2.5"
    >
      <input
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        value={formattedPrice}
        type="text"
        inputMode="numeric"
        onChange={handlePriceChange}
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

export const FormSalePriceInput = ({ name }: FormInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [inputWidth, setInputWidth] = useState<number>(100); // 최소 너비

  const { control } = useFormContext();

  const {
    field: { value: salePrice, onChange, ref },
    // fieldState: { error },
  } = useController({
    name,
    control,
  });

  const { watch } = useFormContext();
  const regularPrice = watch('price');

  // 숫자 세개마다 컴마
  const formattedPrice =
    salePrice === undefined ? '' : salePrice.toLocaleString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, '');

    // 자리수 제한
    if (rawValue.length > 12) {
      return;
    }

    const numericValue = rawValue === '' ? undefined : Number(rawValue);
    onChange(numericValue);
  };

  //input width 조절
  useEffect(() => {
    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setInputWidth(spanWidth + 12);
    }
  }, [formattedPrice]);

  //할인율 계산
  const calculateDiscountRate = useMemo(() => {
    if (salePrice === undefined || regularPrice === undefined) return '';
    else if (salePrice > regularPrice) {
      return null;
    } else {
      const discountRate = Math.round(
        ((regularPrice - salePrice) / regularPrice) * 100
      );
      return discountRate + '% 할인';
    }
  }, [salePrice, regularPrice]);

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'relative flex h-fit w-full items-center justify-start rounded-xs border px-[.8125rem] py-2.5',
          salePrice > regularPrice
            ? 'border-error'
            : 'border-grey03 focus-within:border-grey05'
        )}
      >
        <input
          ref={(e) => {
            inputRef.current = e;
            ref(e);
          }}
          value={formattedPrice}
          type="text"
          inputMode="numeric"
          onChange={handleChange}
          placeholder="할인가를 입력하면, 자동으로 할인율이 계산됩니다."
          className="body2-m placeholder:text-grey06 overflow-hidden break-keep outline-none"
          style={{ width: `${inputWidth}px` }}
        />
        {salePrice && <span className="body2-m">원</span>}

        {/* 숨겨진 span으로 width 측정 */}
        <span
          ref={spanRef}
          className="body2-m invisible absolute whitespace-pre"
        >
          {formattedPrice || '할인가를 입력하면, 자동으로 할인율이 계산됩니다.'}
        </span>
        <span className="text-error body2-m absolute right-[1.5rem]">
          {calculateDiscountRate}
        </span>
      </div>
      {salePrice > regularPrice && (
        <div className="mt-1 flex items-center space-x-1">
          <WarningIcon />
          <span className="caption-m text-error">
            할인가가 정가보다 높습니다.
          </span>
        </div>
      )}
    </div>
  );
};
