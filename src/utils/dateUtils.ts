import { getDday, parseToKstDate } from './formatDate';

export const isItemClosed = (deadline: string | null | undefined): boolean => {
  if (!deadline) return false;
  return new Date(parseToKstDate(deadline)).getTime() < Date.now();
};

// n일 뒤 마감
// 오늘 마감
// 마감
export const getDeadlineLabel = (
  endDate: string | null | undefined
): string | null => {
  if (!endDate) return null;

  const targetDate = new Date(endDate);
  const dday = getDday(targetDate);

  if (dday > 1) return `${dday}일 뒤 마감`;
  if (dday === 1) return `오늘 마감`;
  return `마감`;
};
