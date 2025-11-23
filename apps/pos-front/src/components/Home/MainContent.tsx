'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  isSidebarOpen?: boolean;
}

const MainContent = ({ children, isSidebarOpen = false }: Props) => (
  <main
    aria-hidden={isSidebarOpen}
    className='flex flex-col overflow-hidden h-[calc(100vh-60px)] mt-[60px] w-full'
  >
    <div className='w-full h-full overflow-auto'>
      {children}
    </div>
  </main>
);

export default MainContent;
