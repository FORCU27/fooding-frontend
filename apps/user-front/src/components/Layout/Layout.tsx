'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import Footer from '@/components/Layout/Footer';

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
    <div className='flex flex-col mb-16 bg-gray-1'>
      {children}
      <div className='fixed w-full bottom-0 left-1/2 -translate-x-1/2 z-50 bg-white'>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
