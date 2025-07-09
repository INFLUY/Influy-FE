import cn from '@/utils/cn';
import { parseISOString } from '@/utils/formatDate';
import getTimeChipText from '@/utils/getTimeChipText';
import { useEffect, useState } from 'react';

const Chip = ({
  children,
  theme,
  rounded = false,
}: {
  children: string;
  theme: 'grey' | 'blue' | 'red' | 'light-red' | 'purple';
  rounded?: boolean;
}) => {
  return (
    <div
      className={cn(
        'caption-small-m inline-flex w-fit items-center justify-center px-2 py-[.1875rem]',
        rounded && 'rounded-[.125rem]',
        {
          'bg-grey03 text-grey08': theme === 'grey',
          'bg-sub-light text-sub': theme === 'blue',
          'bg-main text-white': theme === 'red',
          'bg-main-light text-main': theme === 'light-red',
          'bg-[#EBE0FA] text-[#8426FF]': theme === 'purple',
        }
      )}
    >
      {children}
    </div>
  );
};

export const TimeChip = ({
  open,
  deadline,
  rounded,
}: {
  open: string;
  deadline: string;
  rounded?: boolean;
}) => {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const text = getTimeChipText({ open, deadline });
  if (text === 'CLOSED') return;
  return (
    <Chip rounded={rounded} theme="light-red">
      {text}
    </Chip>
  );
};

export const SoldOutChip = ({ rounded }: { rounded?: boolean }) => {
  return (
    <Chip rounded={rounded} theme="grey">
      SOLDOUT
    </Chip>
  );
};

export const ExtendChip = ({
  extend,
  deadline,
}: {
  extend: boolean;
  deadline: string;
}) => {
  if (!extend) return;
  const closeTime = parseISOString(deadline);

  const today = new Date();
  const timeLeftUntilClose = closeTime.getTime() - today.getTime();

  // 데드라인 안 지났을 경우에만 뜸.
  if (timeLeftUntilClose > 0) {
    return <Chip theme="purple">기간 연장</Chip>;
  }
};
