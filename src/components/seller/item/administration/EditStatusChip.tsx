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
  open: string; // "2025-05-20T18:00:00"
  deadline: string; // "2025-05-20T18:00:00"
  onClick: () => void;
}) => {
  const [timeLeftUntilOpen, setTimeLeftUntilOpen] = useState<number>(0);
  const [timeLeftUntilClose, setTimeLeftUntilClose] = useState<number>(0);

  const openTime = new Date(open);
  const closeTime = new Date(deadline);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const leftUntilOpen = openTime.getTime() - now.getTime();
      const leftUntilClose = closeTime.getTime() - now.getTime();
      setTimeLeftUntilOpen(leftUntilOpen);
      setTimeLeftUntilClose(leftUntilClose);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isToday = (d1: Date) => {
    const d2 = new Date();
    return d1.toDateString() === d2.toDateString();
  };

  // 오픈 전
  if (timeLeftUntilOpen > 0) {
    if (!isToday(openTime)) {
      // 오픈 전 - D-n
      const dDay = Math.ceil(timeLeftUntilOpen / (1000 * 60 * 60 * 24));
      return <EditStatusChip onClick={onClick}>{`D-${dDay}`}</EditStatusChip>;
    } else {
      // 오픈 당일 - 18:00 OPEN
      return (
        <EditStatusChip
          onClick={onClick}
        >{`${openTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} OPEN`}</EditStatusChip>
      );
    }
  }
  // 오픈 후
  else {
    const daysLeftUntilClose = Math.floor(
      timeLeftUntilClose / (1000 * 60 * 60 * 24)
    );
    // 오픈 ~ 마감 전 24시간 - NOW OPEN
    if (daysLeftUntilClose >= 1) {
      return <EditStatusChip onClick={onClick}>NOW OPEN</EditStatusChip>;
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
      return (
        <EditStatusChip
          onClick={onClick}
        >{`${hoursLeftUntilClose.toString().padStart(2, '0')}:${minutesLeftUntilClose.toString().padStart(2, '0')}:${secondsLeftUntilClose.toString().padStart(2, '0')} LEFT`}</EditStatusChip>
      );
    }
    // 마감 이후에는 칩이 뜨지 않음
  }
};

export const EditSoldOutChip = ({ onClick }: { onClick: () => void }) => {
  return <EditStatusChip onClick={onClick}>SOLDOUT</EditStatusChip>;
};
