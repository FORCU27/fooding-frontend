'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainContent = ({ children }: Props) => (
  <main
    className={`
      flex flex-col overflow-hidden
      h-[calc(100vh-64px)] mt-[64px]
      w-full sm:ml-[240px] sm:w-[calc(100vw-240px)]
    `}
  >
    {children}
  </main>
);

export default MainContent;
