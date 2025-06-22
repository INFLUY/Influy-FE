import cn from '@/utils/cn';
import { SetStateAction } from 'react';

const ToggleButton = ({
  name,
  isChecked,
  setIsChecked,
}: {
  name: string;
  isChecked: boolean;
  setIsChecked: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative h-6 w-[2.875rem]">
      <input
        id={`${name}-toggle button`}
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        htmlFor={`${name}-toggle button`}
        className={cn(
          'flex h-full w-full cursor-pointer items-center gap-2 rounded-[1.0625rem]',
          isChecked ? 'bg-black' : 'bg-[#D9D9D9]'
        )}
      />
      <span
        className={cn(
          'pointer-events-none absolute top-[.1875rem] left-[.1875rem] z-10 h-[1.125rem] w-[1.125rem] rounded-full bg-white transition-transform duration-300 ease-in-out',
          isChecked ? 'translate-x-[1.375rem]' : 'translate-x-0'
        )}
      />
    </div>
  );
};

export default ToggleButton;
