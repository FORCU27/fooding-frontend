import './globals.css';
import '@stackflow/plugin-basic-ui/index.css';

import { ReactNode, Suspense } from 'react';

import { Metadata } from 'next';

import { Providers } from './providers';
import Analytics from '@/components/GA/Analytics';

export const metadata: Metadata = {
  title: '푸딩 | 당신의 한 끼가 특별해지는 순간',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <body className='overflow-hidden h-dvh bg-gray-1'>
        <Providers>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
