'use client';

import { usePathname } from 'next/navigation';

import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import SideLayout from './SideLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <div className='min-h-screen'>{children}</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderLayout className='h-[64px] border-b border-gray-8' />
      <div className='flex flex-row h-[calc(100dvh-64px)]'>
        <SideLayout />
        <div className='flex flex-col flex-1 bg-gray-7'>
          <main className={`flex p-3 h-full overflow-auto`}>{children}</main>
          <FooterLayout />
        </div>
      </div>
    </div>
  );
};

export default Layout;
