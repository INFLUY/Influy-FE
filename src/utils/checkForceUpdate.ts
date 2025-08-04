import { parseToKstDate, getDday } from '@/utils/formatDate';

// 1초마다 업데이트해야하는지 확인
export const shouldForceSecondUpdate = ({
  open,
  deadline,
  now = new Date(),
}: {
  open?: string | null;
  deadline?: string | null;
  now?: Date;
}): boolean => {
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
};
