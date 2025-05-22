import cn from '@/utils/cn';
import type { SaveButtonProps } from './Button.types';

export const SaveButton = ({
  onClick,
  disabled = true,
  activeColor = 'bg-black',
  disabledColor = 'bg-grey05',
  text = '저장하기',
  additionalStyles,
}: SaveButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'body2-m flex h-[3.0625rem] w-full items-center justify-center rounded-sm text-white',
        disabled ? disabledColor : activeColor,
        additionalStyles
      )}
    >
      {text}
    </button>
  );
};

// flex-1,버튼 2개 나란히 있는 곳 용도. div(flex) 안에 버튼 2개 넣어서 사용
export const DefaultButton = ({
  onClick,
  disabled = false,
  activeColor = 'bg-black ',
  disabledColor = 'bg-grey05 ',
  text = '저장하기',
  additionalStyles,
}: SaveButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'body2-m flex h-[3.0625rem] flex-1 items-center justify-center rounded-sm text-white',
        disabled ? disabledColor + ' cursor-not-allowed' : activeColor,
        additionalStyles
      )}
    >
      {text}
    </button>
  );
};
