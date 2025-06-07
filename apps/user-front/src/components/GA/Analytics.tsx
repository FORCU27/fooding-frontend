'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { GA_TRACKING_ID, pageview } from '@/libs/ga/gtag';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [gtagReady, setGtagReady] = useState(false);

  const handleGtagLoad = () => {
    setGtagReady(true);
  };

  useEffect(() => {
    if (!gtagReady) {
      return;
    }

    if (pathname) {
      const url = `${pathname}${searchParams ? '?' + searchParams : ''}`;
      pageview(url);
    }
  }, [gtagReady, pathname, searchParams]);

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            onLoad={handleGtagLoad}
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
    </>
  );
}
