import React from 'react';

interface PagerHeaderProps {
  leftIcons?: React.ReactNode[];
  rightIcons?: React.ReactNode[];
  children: React.ReactNode;
}

const PageHeader = ({
  leftIcons = [],
  rightIcons = [],
  children,
}: PagerHeaderProps) => {
  return (
    <header className="text-grey10 subhead-sb border-grey03 sticky w-full items-center justify-center border-b px-5 py-[.875rem] text-center">
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
