import { parseISOString } from './formatDate';

export const isItemClosed = (deadline: string | null | undefined): boolean => {
  if (!deadline) return false;
  return new Date(parseISOString(deadline)).getTime() < Date.now();
};
