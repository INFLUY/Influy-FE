export const generateApiPath = (
  path: string,
  params?: Record<string, string | number>
): string => {
  if (!params) return path;

  return Object.keys(params).reduce((acc, key) => {
    const value = params[key];
    if (value === undefined || value === null) return acc; // 문자열 그대로 반환
    return acc.replace(`:${key}`, String(value));
  }, path);
};
