import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import IntlProvider from '../components/provider/IntlProvider';
import MuiProvider from '../components/provider/MuiProvider';
import Analytics from '@/components/GA/Analytics';
import './globals.css';
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
      <body className='font-pretendard'>
        <Suspense fallback={<div>Loading...</div>}>
          <IntlProvider>
            <MuiProvider>
              {children}
              <Analytics />
            </MuiProvider>
          </IntlProvider>
        </Suspense>
      </body>
    </html>
  );
}
