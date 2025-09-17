import './globals.css';
import '@stackflow/plugin-basic-ui/index.css';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { Metadata, Viewport } from 'next';

import { Providers } from './providers';
import Analytics from '@/components/GA/Analytics';
import { kakaoMapScriptSrc } from '@/libs/kakao-map/utils';

export const metadata: Metadata = {
  title: '푸딩 | 당신의 한 끼가 특별해지는 순간',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const viewport: Viewport = {
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <body className='overflow-hidden h-dvh bg-gray-1'>
        <Providers>
          <Suspense>
            {children}
            <Script src={kakaoMapScriptSrc} strategy='beforeInteractive' />
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
