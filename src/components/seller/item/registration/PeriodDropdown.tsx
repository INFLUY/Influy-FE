import { useState } from 'react';
import DropdownArrowIcon from '@/assets/icon/common/DropdownArrow.svg?react';
import cn from '@/utils/cn';

interface DropdownProps {
  period: number | null;
  setPeriod: React.Dispatch<React.SetStateAction<number | null>>;
}

export const PeriodDropdown = ({ period, setPeriod }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: number) => {
    if (option == period) setPeriod(null);
    else setPeriod(option);
    setIsOpen(false);
  };

  return (
    <div className="border-grey03 bg-grey01 h-fit max-h-[19.5rem] w-full rounded border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'body2-m flex w-full justify-between px-[.8125rem] py-2.5 text-left',
          period ? 'text-black' : 'text-grey06'
        )}
      >
        {period ? period + '회차' : '회차 선택'}
        <DropdownArrowIcon />
      </button>
      {isOpen && (
        <ul className="divide-grey03 border-t-grey03 z-1 flex h-[16.5rem] w-full flex-col divide-y-1 overflow-scroll border-t-1">
          {[...Array(30).keys()].map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option + 1)}
              className={cn(
                'hover:bg-grey02 body2-m flex h-fit cursor-pointer items-center gap-2 px-[.8125rem] py-2.5'
              )}
            >
              <div
                className={cn(
                  'h-[1.25rem] w-[1.25rem] rounded-full border-1 p-1',
                  period == option + 1
                    ? 'border-black bg-black'
                    : 'border-grey04 bg-grey02'
                )}
              />
              {option + 1}회차
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
