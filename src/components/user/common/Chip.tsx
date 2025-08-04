import cn from '@/utils/cn';
import {
  parseISOString,
  formatTime,
  getDday,
  getTimeLeft,
  isToday,
} from '@/utils/formatDate';
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
}: {
  open: string | null;
  deadline: string | null;
}): React.ReactNode | null => {
  const now = new Date();
  const [, forceUpdate] = useState(0);

  // 마감 직전 칩만 리렌더링
  const needsSecondUpdate = (() => {
    if (deadline) {
      const closeTime = parseISOString(deadline);
      const daysUntilClose = getDday(closeTime) - 1;
      if (daysUntilClose === 0) return true;
    }
    if (open && deadline) {
      const openTime = parseISOString(open);
      const closeTime = parseISOString(deadline);
      const timeUntilOpen = openTime.getTime() - now.getTime();
      const timeUntilClose = closeTime.getTime() - now.getTime();
      if (timeUntilOpen <= 0 && timeUntilClose > 0) {
        const daysUntilClose = getDday(closeTime) - 1;
        if (daysUntilClose === 0) return true;
      }
    }
    return false;
  })();

  useEffect(() => {
    if (!needsSecondUpdate) return;
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [needsSecondUpdate]);

  // 시작일, 마감일 모두 없음
  if (open === null && deadline === null) {
    return <Chip theme="red">NOW OPEN</Chip>;
  }

  // 시작일 없음, 마감일 있음
  if (open === null && deadline !== null) {
    const closeTime = parseISOString(deadline);
    const timeUntilClose = closeTime.getTime() - now.getTime();
    if (timeUntilClose <= 0) return null;

    const daysUntilClose = getDday(closeTime) - 1;
    if (daysUntilClose >= 1) return <Chip theme="red">NOW OPEN</Chip>;

    if (daysUntilClose === 0) {
      const { hours, minutes, seconds } = getTimeLeft(closeTime);
      return (
        <Chip theme="light-red">{`${hours}:${minutes}:${seconds} LEFT`}</Chip>
      );
    }

    return null;
  }

  // 시작일 있음, 마감일 없음
  if (open !== null && deadline === null) {
    const openTime = parseISOString(open);
    if (now.getTime() >= openTime.getTime()) {
      return <Chip theme="red">NOW OPEN</Chip>;
    }

    const text = isToday({ d1: openTime })
      ? `${formatTime({ date: openTime })} OPEN`
      : `D-${getDday(openTime)}`;

    return <Chip theme="blue">{text}</Chip>;
  }

  // 시작일, 마감일 모두 있음
  if (open !== null && deadline !== null) {
    const openTime = parseISOString(open);
    const closeTime = parseISOString(deadline);

    const timeUntilOpen = openTime.getTime() - now.getTime();
    const timeUntilClose = closeTime.getTime() - now.getTime();

    // 오픈 전
    if (timeUntilOpen > 0) {
      const text = isToday({ d1: openTime })
        ? `${formatTime({ date: openTime })} OPEN`
        : `D-${getDday(openTime)}`;
      return <Chip theme="blue">{text}</Chip>;
    }

    // 마감됨
    if (timeUntilClose <= 0) return null;

    // 마감 전
    const daysUntilClose = getDday(closeTime) - 1;
    if (daysUntilClose >= 1) return <Chip theme="red">NOW OPEN</Chip>;

    if (daysUntilClose === 0) {
      const { hours, minutes, seconds } = getTimeLeft(closeTime);
      return (
        <Chip theme="light-red">{`${hours}:${minutes}:${seconds} LEFT`}</Chip>
      );
    }

    return null;
  }

  return null;
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
