'use client';
import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import './globals.css';
import Analytics from '@/components/GA/Analytics';
import Layout from '@/components/Home/Layout';
import { GA_TRACKING_ID } from '@/lib/GA/gtag';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
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
        <Layout>
          {children}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </Layout>
      </body>
    </html>
  );
}
