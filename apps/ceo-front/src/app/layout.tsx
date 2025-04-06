'use client';
import Script from 'next/script';
import { ReactNode } from 'react';

import './globals.css';
import Analytics from '@/components/GA/Analytics';
import Layout from '@/components/Home/Layout';
import { GA_TRACKING_ID } from '@/lib/GA/gtag';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      {/* Google Analytics 스크립트 로드 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy='afterInteractive'
      />
      {/* Google Analytics 초기화 스크립트 */}
      <Script
        id='google-analytics'
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
      <body>
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
