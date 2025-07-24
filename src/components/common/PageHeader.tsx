import cn from '@/utils/cn';
import React from 'react';

interface PagerHeaderProps {
  leftIcons?: React.ReactNode[];
  rightIcons?: React.ReactNode[];
  children?: React.ReactNode;
  additionalStyles?: string;
}

const PageHeader = ({
  leftIcons = [],
  rightIcons = [],
  children,
  additionalStyles = '',
}: PagerHeaderProps) => {
  return (
    <header
      className={cn(
        'subhead-sb border-grey02 fixed top-0 z-20 flex h-11 w-full max-w-[40rem] min-w-[20rem] items-center justify-center border-b bg-white px-5 text-center text-black md:w-[28rem]',
        additionalStyles
      )}
    >
      <div className="absolute top-1/2 left-5 flex -translate-y-1/2 items-center gap-3">
        {leftIcons.map((icon, idx) => (
          <React.Fragment key={idx}>{icon}</React.Fragment>
        ))}
      </div>
      {children}
      <div className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center gap-3">
        {rightIcons.map((icon, idx) => (
          <React.Fragment key={idx}>{icon}</React.Fragment>
        ))}
      </div>
    </header>
  );
};

export default PageHeader;
