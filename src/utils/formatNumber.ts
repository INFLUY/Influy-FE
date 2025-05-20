export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 10000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
  } else if (num < 100000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
  } else if (num < 1000000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
  } else if (num < 10000000) {
    return Math.floor(num / 10000) + '만';
  } else {
    return num.toString();
  }
};
