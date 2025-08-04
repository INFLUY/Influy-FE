import { parseToKstDate } from './formatDate';

export const isItemClosed = (deadline: string | null | undefined): boolean => {
  if (!deadline) return false;
  return new Date(parseToKstDate(deadline)).getTime() < Date.now();
};
