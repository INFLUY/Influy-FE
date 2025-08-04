import { ReactNode, useEffect, useState } from 'react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import {
  formatTime,
  getDday,
  getTimeLeft,
  isToday,
  parseToKstDate,
} from '@/utils/formatDate';
import cn from '@/utils/cn';
import { ItemCurrentStatusType } from '@/types/common/ItemType.types';

const EditStatusChip = ({
  children,
  onClick,
  theme,
  edit = true,
}: {
  children: ReactNode;
  onClick: () => void;
  theme: 'base' | 'blue' | 'red' | 'light-red';
  edit?: boolean;
}) => {
  return (
    <div
      className={cn(
        'bg-grey03 text-grey09 caption-m inline-flex w-fit cursor-pointer items-center justify-center gap-[.125rem] rounded-[.125rem] px-2 py-1',
        {
          'bg-grey03 text-grey08': theme === 'base',
          'bg-sub-light text-sub': theme === 'blue',
          'bg-main text-white': theme === 'red',
          'bg-main-light text-main': theme === 'light-red',
        }
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {children}
      {edit && <EditIcon className="text-grey09 h-[.875rem] w-[.875rem]" />}
    </div>
  );
};

const EditTimeChip = ({
  open,
  deadline,
  onClick,
}: {
  open: string | null | undefined;
  deadline: string | null | undefined;
  onClick: () => void;
}) => {
  const now = new Date();
  const [, forceUpdate] = useState(0);

  const needsSecondUpdate = (() => {
    if (deadline) {
      const closeTime = parseToKstDate(deadline);
      const daysUntilClose = getDday(closeTime) - 1;
      if (daysUntilClose === 0) return true;
    }
    if (open && deadline) {
      const openTime = parseToKstDate(open);
      const closeTime = parseToKstDate(deadline);
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

  // 1. 설정 전
  if (open === undefined && deadline === undefined) {
    return (
      <EditStatusChip onClick={onClick} theme="base">
        기간 설정 전
      </EditStatusChip>
    );
  }

  // 2. 항상 열림
  else if (
    (open === null || open === undefined) &&
    (deadline === null || deadline === undefined)
  ) {
    return (
      <EditStatusChip onClick={onClick} theme="red">
        NOW OPEN
      </EditStatusChip>
    );
  }

  // 3. 오픈 시간 없음, 마감 시간만 있음
  else if (open === null && deadline !== null && deadline !== undefined) {
    const closeTime = parseToKstDate(deadline);
    const timeLeftUntilClose = closeTime.getTime() - now.getTime();
    const daysLeftUntilClose = getDday(closeTime) - 1;

    if (daysLeftUntilClose >= 1) {
      return (
        <EditStatusChip onClick={onClick} theme="red">
          NOW OPEN
        </EditStatusChip>
      );
    } else if (daysLeftUntilClose === 0 && timeLeftUntilClose > 0) {
      const { hours, minutes, seconds } = getTimeLeft(closeTime);
      return (
        <EditStatusChip onClick={onClick} theme="light-red">
          {hours}:{minutes}:{seconds} LEFT
        </EditStatusChip>
      );
    } else {
      return (
        <EditStatusChip onClick={onClick} edit={false} theme="base">
          마감
        </EditStatusChip>
      );
    }
  }

  // 4. 오픈 시간 있음, 마감 시간 없음
  else if (open !== null && open !== undefined && deadline === null) {
    const openTime = parseToKstDate(open);
    if (now >= openTime) {
      return (
        <EditStatusChip onClick={onClick} theme="red">
          NOW OPEN
        </EditStatusChip>
      );
    } else {
      const dDay = getDday(openTime);
      return (
        <EditStatusChip onClick={onClick} theme="blue">
          D-{dDay}
        </EditStatusChip>
      );
    }
  } else if (
    open !== null &&
    open !== undefined &&
    deadline !== null &&
    deadline !== undefined
  ) {
    // 5. 오픈 시간, 마감 시간 모두 존재
    const openTime = parseToKstDate(open);
    const closeTime = parseToKstDate(deadline);
    const timeLeftUntilOpen = openTime.getTime() - now.getTime();
    const timeLeftUntilClose = closeTime.getTime() - now.getTime();

    if (timeLeftUntilOpen > 0) {
      // 오픈 전
      if (!isToday({ d1: openTime })) {
        const dDay = getDday(openTime);
        return (
          <EditStatusChip onClick={onClick} theme="blue">
            D-{dDay}
          </EditStatusChip>
        );
      } else {
        return (
          <EditStatusChip onClick={onClick} theme="blue">
            {formatTime({ date: openTime })} OPEN
          </EditStatusChip>
        );
      }
    } else {
      // 오픈 후
      const daysLeftUntilClose = getDday(closeTime) - 1;
      if (daysLeftUntilClose >= 1) {
        return (
          <EditStatusChip onClick={onClick} theme="red">
            NOW OPEN
          </EditStatusChip>
        );
      } else if (daysLeftUntilClose === 0 && timeLeftUntilClose > 0) {
        const { hours, minutes, seconds } = getTimeLeft(closeTime);
        return (
          <EditStatusChip onClick={onClick} theme="light-red">
            {hours}:{minutes}:{seconds} LEFT
          </EditStatusChip>
        );
      } else {
        return (
          <EditStatusChip onClick={onClick} edit={false} theme="base">
            마감
          </EditStatusChip>
        );
      }
    }
  }
};

// 실사용 컴포넌트
export const EditStatusUnifiedChip = ({
  currentStatus,
  open,
  deadline,
  onClick,
}: {
  currentStatus: ItemCurrentStatusType;
  open: string | null | undefined;
  deadline: string | null | undefined;
  onClick: () => void;
}) => {
  if (currentStatus === 'SOLD_OUT') {
    return (
      <EditStatusChip onClick={onClick} theme="base">
        SOLDOUT
      </EditStatusChip>
    );
  }

  if (currentStatus === 'EXTEND') {
    if (deadline === null || deadline === undefined) return null;
    const closeTime = parseToKstDate(deadline);
    const now = new Date();
    const timeLeft = closeTime.getTime() - now.getTime();
    if (timeLeft > 0) {
      return (
        <EditStatusChip onClick={onClick} theme="base">
          기간 연장
        </EditStatusChip>
      );
    } else {
      return (
        <EditStatusChip onClick={onClick} theme="base" edit={false}>
          마감
        </EditStatusChip>
      );
    }
  }

  // DEFAULT 상태
  return <EditTimeChip open={open} deadline={deadline} onClick={onClick} />;
};
