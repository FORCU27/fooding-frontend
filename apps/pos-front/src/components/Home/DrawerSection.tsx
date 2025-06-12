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
    <div className='flex'>
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

      <div
        className='hidden sm:fixed sm:inset-y-0 sm:flex sm:w-[240px] bg-gray-100 pt-[65px]'
        style={{ boxSizing: 'border-box' }}
      >
        <DrawerMenuList menuList={menuList} />
      </div>

      <div className='flex justify-items-center'>
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default DrawerSection;
