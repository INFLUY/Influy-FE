import ToolTipTail from '@/assets/icon/seller/ToolTipTail.svg?react';
import cn from '@/utils/cn';

// 아이템 하단에 뜨는 툴팁
export const ToolTipBottom = ({
  text,
  position = 'center',
}: {
  text: string;
  position?: 'center' | 'left' | 'right';
}) => {
  return (
    <div
      className={cn('body2-sb text-sub flex h-fit w-fit flex-col', {
        'items-center': position === 'center',
        'items-start': position === 'left',
        'items-end': position === 'right',
      })}
    >
      <ToolTipTail
        className={cn('h-[.625rem] w-4 rotate-180', {
          'translate-x-3': position === 'left',
          '-translate-x-3': position === 'right',
        })}
      />
      <span className="bg-sub -translate-y-[2px] rounded-[.1875rem] px-3 py-2 text-white">
        {text}
      </span>
    </div>
  );
};

// 아이템 상단에 뜨는 툴팁
export const ToolTipTop = ({
  text,
  position = 'center',
}: {
  text: string;
  position?: 'center' | 'left' | 'right';
}) => {
  return (
    <div
      className={cn('body2-sb text-sub flex h-fit w-fit flex-col', {
        'items-center': position === 'center',
        'items-start': position === 'left',
        'items-end': position === 'right',
      })}
    >
      <span className="bg-sub rounded-[.1875rem] px-3 py-2 text-white">
        {text}
      </span>
      <ToolTipTail
        className={cn('h-[.625rem] w-4 -translate-y-[2px]', {
          'translate-x-3': position === 'left',
          '-translate-x-3': position === 'right',
        })}
      />
    </div>
  );
};
