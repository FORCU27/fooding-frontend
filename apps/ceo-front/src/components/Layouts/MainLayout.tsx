'use client';

import { usePathname } from 'next/navigation';

import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import SideLayout from './SideLayout';
import { useSidebar } from '../../hooks/useSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const { isOpen, screenMode, toggleSidebar, closeSidebar } = useSidebar();

  if (isLoginPage) {
    return <div className='min-h-screen'>{children}</div>;
  }

  // 메인 컨텐츠 패딩 결정
  const getMainPadding = () => {
    switch (screenMode) {
      case 'mobile':
        return 'p-2';
      case 'tablet':
        return 'p-3';
      default:
        return 'p-4';
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderLayout
        className='h-[64px] border-b border-gray-8'
        screenMode={screenMode}
        isSidebarOpen={isOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div className='flex flex-row h-[calc(100dvh-64px)]'>
        <SideLayout screenMode={screenMode} isOpen={isOpen} onClose={closeSidebar} />
        <div
          className={`flex flex-col flex-1 bg-gray-7 ${
            screenMode === 'desktop' ? 'lg:ml-0' : 'w-full'
          }`}
        >
          <main className={`flex h-full overflow-auto ${getMainPadding()}`}>{children}</main>
          <FooterLayout />
        </div>
      </div>
    </div>
  );
};

export default Layout;
