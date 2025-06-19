import cn from '@/utils/cn';

export const TipTooltip = ({
  text,
  bgColor,
  tipColor,
  textColor,
}: {
  text: string;
  bgColor?: string;
  tipColor?: string;
  textColor?: string;
}) => {
  return (
    <div
      className={cn(
        'caption-m flex w-full shrink-0 items-start justify-center gap-1 rounded-[.1875rem] px-2.5 py-2 break-words whitespace-break-spaces',
        bgColor || 'bg-grey02'
      )}
    >
      <span className={cn('text-center', textColor || 'text-grey08')}>
        <span className={cn(tipColor || 'text-black')}>Tip!</span> {text}
      </span>
    </div>
  );
};
