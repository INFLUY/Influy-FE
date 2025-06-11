import cn from '@/utils/cn';
import { ReactNode } from 'react';

export const Tab = ({
  handleClickTab,
  isTabActive,
  children,
  additionalStyles = '',
}: {
  handleClickTab: React.MouseEventHandler<HTMLButtonElement>;
  isTabActive: boolean;
  children: String;
  additionalStyles?: string;
}) => {
  return (
    <button
      type="button"
      className={cn(
        'body2-m z-10 -mb-[2px] flex w-full cursor-pointer flex-col items-center gap-2 border-b-2 py-3 text-center',
        additionalStyles,
        {
          'text-grey03 border-grey03': !isTabActive,
        }
      )}
      onClick={handleClickTab}
    >
      {children}
    </button>
  );
};

export const Tabs = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-grey03 flex w-full border-b-2 px-5" role="tablist">
      {children}
    </div>
  );
};
