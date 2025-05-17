import './globals.css';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { pretendard } from '@repo/font';

import Analytics from '@/components/GA/Analytics';
import IntlProvider from '@/components/Provider/IntlProvider';
import QueryProvider from '@/components/Provider/QueryProvider';
import { GA_TRACKING_ID } from '@/libs/ga/gtag';

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
        <QueryProvider>
          <Suspense>
            <IntlProvider>
              <div className={pretendard.className}>{children}</div>
              <Analytics />
            </IntlProvider>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
