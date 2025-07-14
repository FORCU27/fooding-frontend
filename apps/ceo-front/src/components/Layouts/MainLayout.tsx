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
  const [screenMode, setScreenMode] = useState<ScreenMode>('desktop');

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenMode('mobile');
      } else if (width < 1024) {
        setScreenMode('tablet');
      } else {
        setScreenMode('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 페이지 변경 시 모바일/태블릿에서 사이드바 자동 닫기
  useEffect(() => {
    if (screenMode === 'mobile' || screenMode === 'tablet') {
      setIsOpen(false);
    }
  }, [pathname, screenMode]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

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
        className='h-[74px] border-b border-gray-8'
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
