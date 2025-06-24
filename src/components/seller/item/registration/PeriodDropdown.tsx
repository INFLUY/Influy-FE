import { useState } from 'react';
import DropdownArrowIcon from '@/assets/icon/common/DropdownArrow.svg?react';
import cn from '@/utils/cn';
import { useFormContext, useController } from 'react-hook-form';

interface DropdownProps {
  name: string;
}

export const PeriodDropdown = ({ name }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { control } = useFormContext();

  const {
    field: { value: period, onChange },
  } = useController({
    name,
    control,
  });

  const handleSelect = (option: number) => {
    if (option === period) onChange(null);
    else onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="border-grey03 h-fit max-h-[19.5rem] w-full rounded-xs border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={cn(
          'body2-m flex w-full items-center justify-between px-[.8125rem] py-2.5 text-left',
          period ? 'text-black' : 'text-grey06'
        )}
      >
        {period ? period + '회차' : '회차 선택'}
        <DropdownArrowIcon className="text-grey06" />
      </button>
      {isOpen && (
        <ul className="divide-grey03 border-t-grey03 z-1 flex h-[16.5rem] w-full flex-col divide-y-1 overflow-scroll border-t-1">
          {[...Array(30).keys()].map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option + 1)}
              className="hover:bg-grey02 body2-m flex h-fit cursor-pointer items-center gap-2 px-[.8125rem] py-2.5"
            >
              <div
                className={cn(
                  'h-[1.25rem] w-[1.25rem] rounded-full border-1 p-1',
                  period == option + 1
                    ? 'border-[.3125rem] border-black bg-white'
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
