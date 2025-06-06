import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.css';
import { is, ko } from 'date-fns/locale';
import ChevronIcon from '@/assets/icon/common/Chevron.svg?react';
import Picker from 'react-mobile-picker';
import cn from '@/utils/cn';
import CalendarIcon from '@/assets/icon/common/Calendar.svg?react';
import { SaveButton } from '@/components';
import { useFormContext, useController } from 'react-hook-form';
import { isToday, formatTime, formatDate } from '@/utils/formatDate';

interface DateTimePickerProps {
  selectedDateTime: Date | null;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const DatePickerCalender = ({
  selectedDateTime: selectedDate,
  setSelectedDateTime: setSelectedDate,
}: DateTimePickerProps) => {
  return (
    <div className="border-grey03 relative flex w-full flex-col rounded-[0.1875rem] border">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy. MM. dd."
        locale={ko}
        calendarClassName="custom-calendar"
        dayClassName={(date) => {
          const isSameDay =
            selectedDate && isToday({ d1: date, d2: selectedDate });
          if (isSameDay) {
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
      {/*상단 선택한 날짜 시간 표시*/}
      {selectedDate && (
        <div className="border-t-grey03 body1-m flex items-center justify-between border-t-1 px-4 py-3">
          <span className="text-black">{formatDate(selectedDate)}</span>
          <span>{formatTime({ date: selectedDate })}</span>
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';

interface TimeWheelSelectionsProps {
  amPm: string[];
  hour: string[];
  minute: string[];
}
interface TimePickerProps {
  selectedDateTime: Date;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

const timeWheelSelections: TimeWheelSelectionsProps = {
  amPm: ['오전', '오후'],
  hour: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
  minute: Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, '0')
  ),
};

export const TimePickerWheel = ({
  selectedDateTime,
  setSelectedDateTime,
}: TimePickerProps) => {
  const [pickerValue, setPickerValue] = useState({
    amPm: '오후',
    hour: '12',
    minute: '00',
  });

  useEffect(() => {
    const hour24 =
      pickerValue.amPm === '오전'
        ? pickerValue.hour === '12'
          ? 0
          : parseInt(pickerValue.hour, 10)
        : pickerValue.hour === '12'
          ? 12
          : parseInt(pickerValue.hour, 10) + 12;

    const minute = parseInt(pickerValue.minute, 10);

    const updatedDate = new Date(selectedDateTime);
    updatedDate.setHours(hour24);
    updatedDate.setMinutes(minute);
    updatedDate.setSeconds(0);
    updatedDate.setMilliseconds(0);

    setSelectedDateTime(updatedDate);
  }, [pickerValue]);

  return (
    <div className="border-grey03 relative h-fit w-full rounded-[3px] border p-2.5">
      <div className="absolute top-0 left-0 z-1 h-[1.8125rem] w-full shrink-0 [background:linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.00)_118.18%)]" />
      <Picker
        value={pickerValue}
        onChange={setPickerValue}
        wheelMode="normal" //모바일에서는 natural??
        height={142}
        itemHeight={27}
      >
        {(
          Object.keys(timeWheelSelections) as (keyof TimeWheelSelectionsProps)[]
        ).map((name) => (
          <Picker.Column key={name} name={name}>
            {timeWheelSelections[name].map((option) => (
              <Picker.Item
                key={option}
                value={option}
                className={cn(
                  'subhead-m h-[1.6875rem] transition-colors duration-500',
                  pickerValue[name] === option ? 'text-black' : 'text-grey06'
                )}
              >
                {option}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
    </div>
  );
};

export const DateTimePicker = ({
  dateTimeName,
  hasDateName,
  type,
  onClose,
}: {
  dateTimeName: string;
  hasDateName: string;
  type: string;
  onClose: () => void;
}) => {
  const { control } = useFormContext();

  const {
    field: { value: ISODateTime, onChange },
  } = useController({
    name: dateTimeName,
    control,
  });

  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    ISODateTime ? new Date(ISODateTime) : null
  );

  const {
    field: { onChange: onHasDateChange },
  } = useController({
    name: hasDateName,
    control,
  });

  const handleSaveClick = () => {
    if (selectedDateTime) {
      onChange(selectedDateTime.toISOString());
      onHasDateChange(true);
      onClose();
    }
  };

  return (
    <div className="scrollbar-hide relative h-[32.8125rem] w-full overflow-scroll px-5 pb-8">
      <p className="subhead-b sticky top-0 z-1 h-[2.375rem] bg-white text-center">
        {type} 설정
      </p>
      <article className="relative mt-7 mb-8 flex w-full flex-col justify-between gap-2">
        {/* 상단 날짜 선택 박스 */}
        <div className="border-grey03 body2-m text-grey06 flex w-full shrink-0 items-center justify-between rounded-sm border border-solid px-[.8125rem] py-2.5">
          달력에서 {type}을 선택하세요
          <CalendarIcon />
        </div>
        <DatePickerCalender
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
        />
        {selectedDateTime && (
          <TimePickerWheel
            selectedDateTime={selectedDateTime}
            setSelectedDateTime={setSelectedDateTime}
          />
        )}
      </article>
      <SaveButton disabled={!selectedDateTime} onClick={handleSaveClick} />
    </div>
  );
};
