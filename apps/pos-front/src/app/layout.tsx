'use client';
import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import './globals.css';
import Analytics from '@/components/GA/Analytics';
import { GA_TRACKING_ID } from '@/lib/GA/gtag';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import { ReactQueryProvider } from '@/components/Provider/ReactQueryProvider';
import Layout from '@/components/Home/Layout';

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
        <ReactQueryProvider>
          <Suspense fallback={<div>페이지를 불러오는 중입니다...</div>}>
            <AuthProvider>
              <Layout>
                {children}
                <Analytics />
              </Layout>
            </AuthProvider>
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
