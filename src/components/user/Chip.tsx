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
  open: string; // "2025-05-20T18:00:00Z"
  deadline: string; // "2025-05-20T18:00:00Z"
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
      return <Chip>{`D-${dDay}`}</Chip>;
    } else {
      // 오픈 당일 - 18:00 OPEN
      return (
        <Chip>{`${openTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} OPEN`}</Chip>
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
      return <Chip>NOW OPEN</Chip>;
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
        <Chip>{`${hoursLeftUntilClose.toString().padStart(2, '0')}:${minutesLeftUntilClose.toString().padStart(2, '0')}:${secondsLeftUntilClose.toString().padStart(2, '0')} LEFT`}</Chip>
      );
    }
    // 마감 이후에는 칩이 뜨지 않음
  }
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

  const today = new Date();
  const closeTime = new Date(deadline);
  const timeLeftUntilClose = closeTime.getTime() - today.getTime();

  // 데드라인 안 지났을 경우에만 뜸.
  if (timeLeftUntilClose > 0) {
    return <Chip>연장</Chip>;
  }
};
