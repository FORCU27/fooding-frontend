'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainContent = ({ children }: Props) => (
  <main className='flex flex-col w-full min-h-screen justify-center items-center'>{children}</main>
);

export default MainContent;
