'use client';

import { useRouter } from 'next/navigation';

import DrawerMenuSection from '../Home/DrawerMenuSection';

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

const SideLayout = () => {
  const router = useRouter();

  const handleMenuClick = (menu: MenuItem) => {
    console.log(menu);
    router.push('/login');
  };

  return (
    <div className='flex flex-row h-[calc(100dvh-64px)]'>
      <DrawerMenuSection
        className='border-r border-gray-8 bg-white w-[200px]'
        menuList={menuItems}
        onMenuClick={handleMenuClick}
      />
    </div>
  );
};

export default SideLayout;
