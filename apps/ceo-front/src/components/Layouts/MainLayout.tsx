'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import SideLayout from './SideLayout';
import { ScreenMode } from '../../types/layout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  if (isLoginPage) {
    return <div className='min-h-screen'>{children}</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderLayout
        className='h-[74px] border-b border-gray-8'
        isSidebarOpen={isOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div className='flex flex-row h-[calc(100dvh-64px)]'>
        <SideLayout isOpen={isOpen} onClose={closeSidebar} />
        <div className={`flex flex-col flex-1 bg-gray-7`}>
          <main className={`flex h-full overflow-auto`}>{children}</main>
          <FooterLayout />
        </div>
      </div>
    </div>
  );
};

export default Layout;
