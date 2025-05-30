import { useEffect, useState } from 'react';
import EditIcon from '@/assets/icon/common/EditIcon.svg?react';

const EditStatusChip = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="bg-grey03 text-grey09 caption-m inline-flex w-fit items-center justify-center gap-[.125rem] rounded-[.125rem] px-2 py-[.1875rem]"
      onClick={onClick}
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
  open: string; // "2025-05-29T06:34:07.837159"
  deadline: string; // "2025-05-29T06:34:07.837159"
  onClick: () => void;
}) => {
  const [, forceUpdate] = useState(0); // 강제 리렌더링을 위함

  const openTime = new Date(open.split('.')[0]);
  const closeTime = new Date(deadline.split('.')[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1); // 1초마다 리렌더링 트리거
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const timeLeftUntilOpen = openTime.getTime() - now.getTime();
  const timeLeftUntilClose = closeTime.getTime() - now.getTime();

  const isToday = (d1: Date) => {
    const d2 = new Date();
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  if (timeLeftUntilOpen === 0 && timeLeftUntilClose === 0) return null;

  let chipText = '';

  // 오픈 전
  if (timeLeftUntilOpen > 0) {
    if (!isToday(openTime)) {
      // 오픈 전 - D-n
      const dDay = Math.ceil(timeLeftUntilOpen / (1000 * 60 * 60 * 24));
      chipText = `D-${dDay}`;
    } else {
      // 오픈 당일 - 18:00 OPEN
      chipText = `${openTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} OPEN`;
    }
  }
  // 오픈 후
  else {
    const daysLeftUntilClose = Math.floor(
      timeLeftUntilClose / (1000 * 60 * 60 * 24)
    );
    // 오픈 ~ 마감 전 24시간 - NOW OPEN
    if (daysLeftUntilClose >= 1) {
      chipText = 'NOW OPEN';
    }
    // 마감 전 24시간 ~ 마감 - 23:59:59 LEFT
    else if (daysLeftUntilClose === 0 && timeLeftUntilClose > 0) {
      const hoursLeftUntilClose = Math.floor(
        timeLeftUntilClose / (1000 * 60 * 60)
      );
      const minutesLeftUntilClose = Math.floor(
        (timeLeftUntilClose % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeftUntilClose = Math.floor(
        (timeLeftUntilClose % (1000 * 60)) / 1000
      );
      chipText = `${hoursLeftUntilClose.toString().padStart(2, '0')}:${minutesLeftUntilClose.toString().padStart(2, '0')}:${secondsLeftUntilClose.toString().padStart(2, '0')} LEFT`;
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
