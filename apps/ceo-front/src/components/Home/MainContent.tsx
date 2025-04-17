import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainContent = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default MainContent;
