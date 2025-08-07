import ToolTipTail from '@/assets/icon/seller/ToolTipTail.svg?react';
import cn from '@/utils/cn';

export const ToolTip = ({
  text,
  position = 'center',
  direction = 'top',
  additionalStyles,
}: {
  text: string;
  position?: 'center' | 'left' | 'right';
  direction?: 'top' | 'bottom';
  additionalStyles?: string;
}) => {
  const isTop = direction === 'top';

  return (
    <div
      className={cn(
        'body2-sb text-sub flex h-fit w-fit flex-col',
        {
          'items-center': position === 'center',
          'items-start': position === 'left',
          'items-end': position === 'right',
        },
        additionalStyles
      )}
    >
      {isTop && (
        <>
          <span className="bg-sub rounded-[.1875rem] px-3 py-2 text-white">
            {text}
          </span>
          <ToolTipTail
            className={cn('h-[.625rem] w-4 -translate-y-[2px]', {
              'translate-x-3': position === 'left',
              '-translate-x-3': position === 'right',
            })}
          />
        </>
      )}

      {!isTop && (
        <>
          <ToolTipTail
            className={cn('h-[.625rem] w-4 rotate-180', {
              'translate-x-3': position === 'left',
              '-translate-x-3': position === 'right',
            })}
          />
          <span className="bg-sub -translate-y-[2px] rounded-[.1875rem] px-3 py-2 text-white">
            {text}
          </span>
        </>
      )}
    </div>
  );
};
