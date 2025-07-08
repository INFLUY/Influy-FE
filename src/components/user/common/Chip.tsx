import cn from '@/utils/cn';
import {
  formatTime,
  getDday,
  getTimeLeft,
  isToday,
  parseISOString,
} from '@/utils/formatDate';
import { useEffect, useState } from 'react';

const Chip = ({
  children,
  theme,
}: {
  children: string;
  theme: 'grey' | 'blue' | 'red' | 'light-red' | 'purple';
}) => {
  return (
    <div
      className={cn(
        'caption-small-m inline-flex w-fit items-center justify-center px-2 py-[.1875rem]',
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

export const getTimeChipText = ({
  open,
  deadline,
}: {
  open: string;
  deadline: string;
}): string => {
  const now = new Date();
  const openTime = parseISOString(open);
  const closeTime = parseISOString(deadline);

  const timeUntilOpen = openTime.getTime() - now.getTime();
  const timeUntilClose = closeTime.getTime() - now.getTime();

  if (timeUntilOpen <= 0 && timeUntilClose <= 0) return 'CLOSED';

  // 오픈 전
  if (timeUntilOpen > 0) {
    return isToday({ d1: openTime })
      ? `${formatTime({ date: openTime })} OPEN`
      : `D-${getDday(closeTime)}`;
  }

  // 오픈 후
  const daysUntilClose = getDday(closeTime) - 1;
  if (daysUntilClose >= 1) return 'NOW OPEN';

  if (daysUntilClose === 0 && timeUntilClose > 0) {
    const { hours, minutes, seconds } = getTimeLeft(closeTime);
    return `${hours}:${minutes}:${seconds} LEFT`;
  }

  return 'CLOSED';
};

export const TimeChip = ({
  open,
  deadline,
}: {
  open: string;
  deadline: string;
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
  return <Chip theme="light-red">{text}</Chip>;
};

export const SoldOutChip = () => {
  return <Chip theme="grey">SOLDOUT</Chip>;
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
