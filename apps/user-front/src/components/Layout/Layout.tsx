'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import Footer from '../Footer';
import Menubar from './Menubar';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <div>{children}</div>;
  }

  return (
    <div className='flex w-full justify-center items-center bg-gray-1 overflow-x-hidden'>
      <div className='flex flex-col w-full mb-16'>
        <Header />
        <Menubar />
        {children}
      </div>
      <div className='fixed w-full bottom-0 left-1/2 -translate-x-1/2 z-50 bg-white'>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
