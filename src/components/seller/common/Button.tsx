import cn from '@/utils/cn';
import type { ModalButtonProps, SaveButtonProps } from './Button.types';

// flex-1,버튼 2개 나란히 있는 곳 용도. div(flex) 안에 버튼 2개 넣어서 사용
export const DefaultButton = ({
  onClick,
  disabled = false,
  activeColor = 'bg-black ',
  disabledColor = 'bg-grey05 ',
  text = '저장하기',
  additionalStyles,
  type = 'button',
  useDisabled = true,
}: SaveButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={useDisabled ? disabled : false}
      className={cn(
        'body2-m box-border flex h-fit w-full flex-1 cursor-pointer items-center justify-center rounded-sm py-3.5 text-white',
        disabled ? disabledColor : activeColor,
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
