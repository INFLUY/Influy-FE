import { useEffect, useState } from 'react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import {
  formatTime,
  getDday,
  getTimeLeft,
  isToday,
  parseISOString,
} from '@/utils/formatDate';

const EditStatusChip = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="bg-grey03 text-grey09 caption-m inline-flex w-fit cursor-pointer items-center justify-center gap-[.125rem] rounded-[.125rem] px-2 py-1"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
      <EditIcon className="text-grey06 h-[.875rem] w-[.875rem]" />
    </div>
  );
};

export const EditTimeChip = ({
  open,
  deadline,
  onClick,
}: {
  open: string | null; // "2025-05-29T06:34:07.837159"
  deadline: string | null; // "2025-05-29T06:34:07.837159"
  onClick: () => void;
}) => {
  if (open === null || deadline === null) {
    return <EditStatusChip onClick={onClick}>기간 설정 전</EditStatusChip>;
  }
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
      // 마감
      chipText = `CLOSED`;
    }
  }
  return <EditStatusChip onClick={onClick}>{chipText}</EditStatusChip>;
};

export const EditSoldOutChip = ({ onClick }: { onClick: () => void }) => {
  return <EditStatusChip onClick={onClick}>SOLDOUT</EditStatusChip>;
};
