'use client';

import MainContent from './MainContent';

const DrawerSection = ({ children }: { children: React.ReactNode }) => {
  return <MainContent>{children}</MainContent>;
};

export default DrawerSection;
