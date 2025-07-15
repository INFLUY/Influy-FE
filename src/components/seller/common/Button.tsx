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
  const isActuallyDisabled = useDisabled && disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isActuallyDisabled}
      className={cn(
        'body2-m box-border flex h-[3.0625rem] w-full items-center justify-center rounded-xs bg-black text-white',
        {
          'bg-grey05 cursor-default':
            useDisabled && disabled && disabledTheme === 'base',

          'cursor-pointer bg-black text-white':
            (!useDisabled || !disabled) && activeTheme === 'black',

          'cursor-pointer border border-black bg-white text-black':
            (!useDisabled || !disabled) && activeTheme === 'white',

          'bg-grey04 cursor-pointer text-black':
            (!useDisabled || !disabled) && activeTheme === 'grey',
        },
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
          'text-grey10 border border-black bg-white': theme === 'white',
          'border-error bg-error border text-white': theme === 'red',
        }
      )}
    >
      {text}
    </button>
  );
};

import AddIcon from '@/assets/icon/common/AddIcon.svg?react';
import AddIconBase from '@/assets/icon/common/Add1Icon.svg?react';

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
        'text-grey07 body2-m border-grey03 body2-m flex w-full cursor-pointer items-center justify-center gap-1 border',
        {
          'h-[5.25rem]': size === 'large',
          'h-[3.0625rem]': size === 'base',
        }
      )}
      onClick={() => handleOnClick()}
    >
      {size === 'large' && <AddIcon className="text-grey07" />}
      {size === 'base' && <AddIconBase className="text-grey07" />}
      <span>{children}</span>
    </button>
  );
};
