const STORAGE_KEY = 'recent_keywords';
const MAX_KEYWORDS = 10;

export const getRecentKeywords = (): string[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const addRecentKeyword = (keyword: string) => {
  if (!keyword.trim()) return;
  const prev = getRecentKeywords().filter((k) => k !== keyword);
  const updated = [keyword, ...prev].slice(0, MAX_KEYWORDS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const removeRecentKeyword = (keyword: string) => {
  const filtered = getRecentKeywords().filter((k) => k !== keyword);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearRecentKeywords = () => {
  localStorage.removeItem(STORAGE_KEY);
};
