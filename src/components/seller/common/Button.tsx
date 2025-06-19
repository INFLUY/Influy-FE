import cn from '@/utils/cn';
import type { ModalButtonProps, DefaultButtonProps } from './Button.types';

export const DefaultButton = ({
  onClick,
  disabled = false,
  activeColor = 'bg-black',
  useDisabled = true,
  disabledColor = 'bg-grey05',
  text = '저장하기',
  additionalStyles,
  type = 'button',
}: DefaultButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={useDisabled ? disabled : false}
      className={cn(
        'body2-m box-border flex h-fit w-full items-center justify-center rounded-sm py-3.5 text-white',
        disabled
          ? `${disabledColor} cursor-default`
          : `${activeColor} cursor-pointer`,
        additionalStyles
      )}
    >
      {text}
    </button>
  );
};

// 모달 버튼
export const ModalButton = ({
  onClick,
  theme = 'black',
  text,
}: ModalButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'body2-m box-border flex h-fit w-full min-w-[7.5625rem] cursor-pointer items-center justify-center rounded-[.1875rem] py-[.625rem]',
        {
          'border border-black bg-black text-white': theme === 'black',
          'border-grey03 text-grey10 border bg-white': theme === 'white',
          'border-error bg-error border text-white': theme === 'red',
        }
      )}
    >
      {text}
    </button>
  );
};

import PlusIcon from '@/assets/icon/common/PlusIcon.svg?react';

// 추가 버튼
export const AddButton = ({
  handleOnClick,
  size = 'base',
  children,
}: {
  handleOnClick: () => void;
  size?: 'base' | 'large';
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      className={cn(
        'text-grey07 body2-m border-grey03 flex w-full cursor-pointer items-center justify-center gap-1 border',
        {
          'py-[2.4063rem]': size === 'large',
          'py-[.875rem]': size === 'base',
        }
      )}
      onClick={() => handleOnClick()}
    >
      <PlusIcon className="text-grey07 h-5 w-5" />
      <span>{children}</span>
    </button>
  );
};
