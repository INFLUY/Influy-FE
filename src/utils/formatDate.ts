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

export const formatDate = ({
  date,
  includeWeekday = true,
}: {
  date: Date;
  includeWeekday?: boolean;
}) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(includeWeekday && { weekday: 'short' }),
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

export const formatFullDateWithDay = ({
  isoString,
  includeYear = true,
}: {
  isoString: string;
  includeYear?: boolean;
}): string => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = weekDays[date.getDay()];

  return `${includeYear ? `${year}.` : ''}${month}.${day}. (${dayOfWeek}) ${hour}:${minute}`;
};

// 2025.05.10
// 2025.05.10T00:00:00Z 형태의 문자열을 2025.05.10 형태의 string으로 변환
export const parseDateString = (dateString: string) => {
  return dateString.split('T')[0].replace(/-/g, '.');
};

export const formatKrDate = (dateIso: string) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateIso);
  const startDay = days[date.getDay()];

  const startFormatted = `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(
      2,
      '0'
    )}.${date.getDate().toString().padStart(2, '0')}(${startDay})`;

  return `${startFormatted}`;
};
