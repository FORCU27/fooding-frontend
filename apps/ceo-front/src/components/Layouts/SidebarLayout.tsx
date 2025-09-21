'use client';

import { usePathname } from 'next/navigation';

import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isStoreSelectPage = pathname === '/my/store/select';

  // TODO: 매장 선택 페이지 레이아웃 분리
  if (isStoreSelectPage) {
    return (
      <div className='flex flex-col min-h-screen'>
        {children}
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Sidebar className='hidden desktop:flex' />
      <div className='flex flex-col bg-gray-7 desktop:ml-sidebar-width min-h-dvh'>
        <main className='flex w-full mt-15 max-w-[1080px] mx-auto flex-col px-5 tablet:px-8'>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
