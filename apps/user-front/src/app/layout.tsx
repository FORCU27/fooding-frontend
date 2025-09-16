import './globals.css';
import '@stackflow/plugin-basic-ui/index.css';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { Metadata, Viewport } from 'next';

import { Providers } from './providers';
import Analytics from '@/components/GA/Analytics';

export const metadata: Metadata = {
  title: '푸딩 | 당신의 한 끼가 특별해지는 순간',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const viewport: Viewport = {
  viewportFit: 'cover', // safe-area-inset 활성화
  userScalable: false, // 핀치 줌 비활성화
};

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <body className='overflow-hidden h-dvh bg-gray-1'>
        <Providers>
          <Suspense>
            <Script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services,clusterer&autoload=false`}
              strategy='beforeInteractive'
            />
            {children}
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
