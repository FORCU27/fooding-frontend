'use client';

import { ReactNode } from 'react';

import DrawerMenuList from './DrawerMenuList';
import { MenuItem } from './Layout';
import MainContent from './MainContent';

interface DrawerSectionProps {
  children: ReactNode;
  menuList: MenuItem[];
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const DrawerSection = ({
  children,
  menuList,
  mobileOpen,
  handleDrawerToggle,
}: DrawerSectionProps) => {
  return (
    <>
      {/* 모바일 사이드바 */}
      {mobileOpen && (
        <div className='fixed inset-0 z-40 flex sm:hidden' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-25' onClick={handleDrawerToggle}></div>
          <div
            className='relative w-[240px] bg-white shadow-md z-50'
            style={{ boxSizing: 'border-box' }}
          >
            <DrawerMenuList menuList={menuList} />
          </div>
        </div>
      )}

      {/* 데스크톱 사이드바 - 오버레이 방식 */}
      {mobileOpen && (
        <>
          <div
            className='hidden sm:fixed sm:inset-0 sm:block sm:bg-black sm:bg-opacity-25 sm:z-40'
            onClick={handleDrawerToggle}
          />
          <div
            className='hidden sm:fixed sm:inset-y-0 sm:left-0 sm:flex sm:w-[240px] bg-gray-100 pt-[60px] transition-transform duration-300 ease-in-out z-[60] shadow-lg'
            style={{ boxSizing: 'border-box' }}
          >
            <DrawerMenuList menuList={menuList} />
          </div>
        </>
      )}

      <MainContent isSidebarOpen={mobileOpen}>{children}</MainContent>
    </>
  );
};

export default DrawerSection;
