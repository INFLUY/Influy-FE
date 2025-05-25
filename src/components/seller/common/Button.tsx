import cn from '@/utils/cn';
import type { SaveButtonProps } from './Button.types';

export const SaveButton = ({
  onClick,
  disabled = false,
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
        'body2-m flex h-fit w-full cursor-pointer items-center justify-center rounded-sm py-3.5 text-white',
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
        'body2-m box-border flex h-fit flex-1 items-center justify-center rounded-sm py-3.5 text-white',
        disabled ? disabledColor + ' cursor-not-allowed' : activeColor,
        additionalStyles
      )}
    >
      {text}
    </button>
  );
};
