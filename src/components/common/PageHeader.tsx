import React from 'react';
import cn from '@/utils/cn';

interface PagerHeaderProps {
  leftIcons?: React.ReactNode[];
  rightIcons?: React.ReactNode[];
  children: React.ReactNode;
  backgroundColor?: string;
}

const PageHeader = ({
  leftIcons = [],
  rightIcons = [],
  children,
  backgroundColor = 'bg-white',
}: PagerHeaderProps) => {
  return (
    <header
      className={cn(
        'text-grey10 subhead-sb border-grey03 sticky top-0 z-50 w-full items-center justify-center border-b px-5 py-[.875rem] text-center',
        backgroundColor
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
