import cn from '@/utils/cn';

export const TipTooltip = ({
  text,
  bgColor,
  tipColor,
  textColor,
  tip = true,
}: {
  text: string;
  bgColor?: string;
  tipColor?: string;
  textColor?: string;
  tip?: boolean;
}) => {
  return (
    <div
      className={cn(
        'caption-m flex w-full shrink-0 items-start justify-center gap-1 rounded-[.1875rem] px-2.5 py-2 break-keep whitespace-break-spaces',
        bgColor || 'bg-grey01'
      )}
    >
      <span className={cn('text-center', textColor || 'text-grey08')}>
        {tip && <span className={cn(tipColor || 'text-black')}>Tip!</span>}{' '}
        {text}
      </span>
    </div>
  );
};
