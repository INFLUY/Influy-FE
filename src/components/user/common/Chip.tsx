import {
  formatTime,
  getDday,
  getTimeLeft,
  isToday,
  parseISOString,
} from '@/utils/formatDate';
import { useEffect, useState } from 'react';

const Chip = ({ children }: { children: string }) => {
  return (
    <div className="bg-grey03 text-grey08 caption-small-m inline-flex w-fit items-center justify-center rounded-[.125rem] px-2 py-[.1875rem]">
      {children}
    </div>
  );
};

export const TimeChip = ({
  open,
  deadline,
}: {
  open: string; // "2025-05-20T18:00:00"
  deadline: string; // "2025-05-20T18:00:00"
}) => {
  const [, forceUpdate] = useState(0); // 강제 리렌더링을 위함

  const openTime = parseISOString(open);
  const closeTime = parseISOString(deadline);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1); // 1초마다 리렌더링 트리거
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const timeLeftUntilOpen = openTime.getTime() - now.getTime();
  const timeLeftUntilClose = closeTime.getTime() - now.getTime();

  if (timeLeftUntilOpen === 0 && timeLeftUntilClose === 0) return null;

  let chipText = '';

  // 오픈 전
  if (timeLeftUntilOpen > 0) {
    if (!isToday({ d1: openTime })) {
      // 오픈 전 - D-n
      const dDay = getDday(closeTime);
      chipText = `D-${dDay}`;
    } else {
      // 오픈 당일 - 18:00 OPEN
      chipText = `${formatTime({ date: openTime })} OPEN`;
    }
  }
  // 오픈 후
  else {
    const daysLeftUntilClose = getDday(closeTime) - 1;
    // 오픈 ~ 마감 전 24시간 - NOW OPEN
    if (daysLeftUntilClose >= 1) {
      chipText = 'NOW OPEN';
    }
    // 마감 전 24시간 ~ 마감 - 23:59:59 LEFT
    else if (daysLeftUntilClose === 0 && timeLeftUntilClose > 0) {
      const { hours, minutes, seconds } = getTimeLeft(closeTime);
      chipText = `${hours}:${minutes}:${seconds} LEFT`;
    } else {
      // 마감 이후 CLOSED
      chipText = 'CLOSED';
    }
  }
  return <Chip>{chipText}</Chip>;
};

export const SoldOutChip = () => {
  return <Chip>SOLDOUT</Chip>;
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
    return <Chip>기간 연장</Chip>;
  }
};
