import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.css';
import { ko } from 'date-fns/locale';
import ChevronIcon from '@/assets/icon/common/Chevron.svg?react';

export const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="w-full">
      {' '}
      <div className="mt-4 text-center text-sm text-gray-700">
        {selectedDate
          ? `${selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })} ${selectedDate.toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}`
          : '날짜를 선택하세요'}
      </div>
      <div className="mb-2">
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy. MM. dd."
            locale={ko}
            calendarClassName="custom-calendar"
            dayClassName={(date) => {
              const isSameDay =
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();

              const isSameMonth =
                date.getMonth() === (selectedDate?.getMonth() ?? -1);

              if (isSameDay && isSameMonth) {
                return 'custom-selected-day'; // 내가 지정한 검은 동그라미 스타일
              }
              return '';
            }}
            inline
            // 상단 날짜 및 화살표
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="mb-[0.76rem] h-fit w-full">
                {/* 상단 화살표, 달 표시 부분 */}
                <div className="grid h-fit w-full grid-cols-7 items-center justify-items-center">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="w-fit"
                  >
                    <ChevronIcon className="text-grey07 h-4 w-4 rotate-180" />
                  </button>
                  <span className="body1-b col-span-5 text-black">
                    {date.getFullYear()}년 {date.getMonth() + 1}월
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="w-fit"
                  >
                    <ChevronIcon className="text-grey07 h-4 w-4" />
                  </button>
                </div>
                <div className="text-grey04 body1-b mt-5 grid grid-cols-7">
                  <span aria-label="일요일">일</span>
                  <span aria-label="월요일">월</span>
                  <span aria-label="화요일">화</span>
                  <span aria-label="수요일">수</span>
                  <span aria-label="목요일">목</span>
                  <span aria-label="금요일">금</span>
                  <span aria-label="토요일">토</span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
