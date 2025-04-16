'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  themeColor?: 'light' | 'dark';
}

function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default Layout;
