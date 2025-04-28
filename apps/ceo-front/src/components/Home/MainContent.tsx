import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const MainContent = ({ className, children }: Props) => {
  return <main className={`flex p-3 h-full overflow-auto ${className || ''}`}>{children}</main>;
};

export default MainContent;
