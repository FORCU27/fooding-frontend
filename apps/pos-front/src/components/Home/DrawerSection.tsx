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
      <div
        className={`fixed inset-0 z-40 flex sm:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role='dialog'
        aria-modal='true'
      >
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${
            mobileOpen ? 'bg-opacity-25' : 'bg-opacity-0'
          }`}
          onClick={handleDrawerToggle}
        />
        <div
          className={`relative z-50 w-[240px] bg-white shadow-md transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <DrawerMenuList menuList={menuList} />
        </div>
      </div>

      {/* 데스크톱 사이드바 (overlay) */}
      <div className='hidden sm:block'>
        <div
          className={`fixed left-0 right-0 top-[60px] bottom-0 z-30 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100 bg-transparent' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleDrawerToggle}
        />
        <div
          className={`fixed left-0 top-[60px] bottom-0 z-40 w-[240px] border-r border-gray-2 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <DrawerMenuList menuList={menuList} />
        </div>
      </div>

      <MainContent isSidebarOpen={mobileOpen}>{children}</MainContent>
    </>
  );
};

export default DrawerSection;
