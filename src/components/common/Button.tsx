import cn from '@/utils/cn';
import type { SaveButtonProps } from './Button.types';

export const SaveButton = ({
  onClick,
  disabled = true,
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
        'body2-m flex h-[3.0625rem] w-[20.9375rem] items-center justify-center rounded-sm text-white',
        disabled ? disabledColor + ' cursor-not-allowed' : activeColor,
        additionalStyles
      )}
    >
      {text}
    </button>
  );
};
