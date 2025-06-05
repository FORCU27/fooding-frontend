import './globals.css';

import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Providers } from './providers';
import Analytics from '@/components/GA/Analytics';
import Layout from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: '푸딩 | 당신의 한 끼가 특별해지는 순간',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <head />
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}
