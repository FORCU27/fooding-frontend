import './globals.css';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { Metadata } from 'next';

import { Providers } from './providers';
import Analytics from '@/components/GA/Analytics';
import { GA_TRACKING_ID } from '@/libs/ga/gtag';

export const metadata: Metadata = {
  title: '푸딩 | 당신의 한 끼가 특별해지는 순간',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head />
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
            }}
          />
        </>
      )}
      <body>
        <Suspense>
          <Providers>
            {children}
            <Analytics />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
