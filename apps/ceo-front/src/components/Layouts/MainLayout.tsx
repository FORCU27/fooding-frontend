'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import SideLayout from './SideLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isStoreSelectPage = pathname === '/my/store/select';

  // 초기값을 함수로 설정
  const [isOpen, setIsOpen] = useState(() => false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  if (isLoginPage || isStoreSelectPage) {
    return (
      <div className='flex flex-col min-h-screen'>
        {children}
        <FooterLayout />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen' suppressHydrationWarning>
      <HeaderLayout
        className='h-[74px] border-b border-gray-8'
        isSidebarOpen={isOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div className='flex flex-row'>
        <SideLayout isOpen={isOpen} onClose={closeSidebar} />
        <div className={`flex flex-col flex-1 bg-gray-7 items-center`}>
          <main className={`flex h-full overflow-auto mt-15 w-full`}>
            <div className='w-full max-w-[727px] md:max-w-[959px] lg:max-w-[1080px]  mx-auto '>
              <div className='min-w-[400px] md:min-w-[704px] mx-5 md:mx-8 lg:mx-10'>{children}</div>
            </div>
          </main>
          <FooterLayout />
        </div>
      </div>
    </div>
  );
};

export default Layout;
