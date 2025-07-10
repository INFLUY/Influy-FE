import {
  formatTime,
  getDday,
  getTimeLeft,
  isToday,
  parseISOString,
} from './formatDate';

const getTimeChipText = ({
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

export default getTimeChipText;
