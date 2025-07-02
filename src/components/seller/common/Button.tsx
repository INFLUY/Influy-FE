import cn from '@/utils/cn';
import type { ModalButtonProps, DefaultButtonProps } from './Button.types';

export const DefaultButton = ({
  onClick,
  disabled = false,
  activeTheme = 'black',
  disabledTheme = 'base',
  useDisabled = true,
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
        'body2-m box-border flex h-[3.0625rem] w-full items-center justify-center rounded-xs bg-black text-white',
        disabled
          ? disabledTheme === 'base'
            ? 'bg-grey05 cursor-default text-white'
            : ''
          : activeTheme === 'black'
            ? 'cursor-pointer bg-black text-white'
            : activeTheme === 'white'
              ? 'cursor-pointer border border-black bg-white text-black'
              : activeTheme === 'grey'
                ? 'bg-grey04 cursor-pointer text-black'
                : '',
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
          'h-[6.125rem]': size === 'large',
          'h-[3.0625rem]': size === 'base',
        }
      )}
      onClick={() => handleOnClick()}
    >
      <PlusIcon
        className={cn('text-grey07', {
          'h-6 w-6': size === 'large',
          'h-5 w-5': size === 'base',
        })}
      />
      <span>{children}</span>
    </button>
  );
};
