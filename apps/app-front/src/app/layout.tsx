import './globals.css';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { pretendard } from '@repo/design-system/font';

import Analytics from '@/components/GA/Analytics';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import IntlProvider from '@/components/Provider/IntlProvider';
import QueryProvider from '@/components/Provider/QueryProvider';
import { GA_TRACKING_ID } from '@/libs/ga/gtag';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={pretendard.className}>
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
        <QueryProvider>
          <Suspense>
            <IntlProvider>
              <AuthProvider>
                <div className={`${pretendard.className} app-front`}>{children}</div>
                <Analytics />
              </AuthProvider>
            </IntlProvider>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
