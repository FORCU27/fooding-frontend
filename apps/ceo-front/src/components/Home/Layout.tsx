'use client';

import AppBarSection from './AppBarSection';
import DrawerSection from './DrawerSection';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <AppBarSection />
      <DrawerSection>{children}</DrawerSection>
    </div>
  );
};

export default Layout;
