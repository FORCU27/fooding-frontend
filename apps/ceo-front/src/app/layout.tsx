import './globals.css';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { Providers } from './providers';
import Analytics from '@/components/GA/Analytics';
import Layout from '@/components/Home/Layout';
import { GA_TRACKING_ID } from '@/libs/ga/gtag';

export const metadata: Metadata = {
  title: '푸딩 사장님 사이트',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body>
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

        <Providers>
          <Suspense fallback={<div>페이지를 불러오는 중입니다...</div>}>
            <Layout>
              {children}
              <Analytics />
            </Layout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
