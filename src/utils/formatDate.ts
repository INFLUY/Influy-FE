// 날짜가 오늘이면 true 반환, 오늘이 아니면 false 반환
interface isTodayProps {
  d1: Date;
  d2?: Date;
}
export const isToday = ({ d1, d2 = new Date() }: isTodayProps) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// D-day 반환
export const getDday = (targetDate: Date) => {
  const now = new Date();
  return Math.ceil(
    (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
};

// 남은 시간 (시:분:초) 계산
export const getTimeLeft = (targetDate: Date) => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
};

export const formatTime = ({
  date,
  hour12 = false,
}: {
  date: Date;
  hour12?: boolean;
}) => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12,
  });
};

export const parseISOString = (isoString: string) => {
  return new Date(isoString.split('.')[0]);
};
