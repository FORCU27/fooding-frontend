'use client';

import { usePathname } from 'next/navigation';

import AppBarSection from './AppBarSection';
import DrawerMenuSection from './DrawerMenuSection';
import MainContent from './MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

export interface MenuItem {
  id: string;
  text: string;
  path: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    text: '매장 정보 관리',
    path: '/',
    subItems: [
      { id: '/home', text: '홈', path: '/' },
      { id: '/home/news', text: '소식', path: '/' },
      { id: '/home/menus', text: '메뉴', path: '/' },
      { id: '/home/seatGuide', text: '좌석안내', path: '/' },
      { id: '/home/facilities', text: '편의시설', path: '/' },
    ],
  },
  {
    id: 'devices',
    text: '기기관리',
    path: '/devices',
  },
];

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <div className='min-h-screen'>{children}</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <AppBarSection className='h-[64px] border-b border-[#E3E3E3]' />
      <div className='flex flex-row h-[calc(100dvh-64px)]'>
        <DrawerMenuSection
          className='border-r border-[#E3E3E3] bg-[#F3F5F7] w-[200px]'
          menuList={menuItems}
        />
        <MainContent className='w-[calc(100%-200px)] flex-1'>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
