import './globals.css';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Analytics from '@/components/GA/Analytics';
import KakaoMapScript from '@/components/KakaoMapScript';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import { ReactQueryProvider } from '@/components/Provider/ReactQueryProvider';
import { GA_TRACKING_ID } from '@/libs/ga/gtag';

export const metadata: Metadata = {
  title: '푸딩 사장님 사이트',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    // TODO 쿼리 키 config에 저장해서 활용
    // TODO 초기 렌더 시 깜박이는 현상 대응
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 60_000,
  });

  await qc.prefetchQuery({
    queryKey: ['selectedStore'],
    queryFn: async () => {
      const res = await fetch('/api/store/select', { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  await qc.prefetchQuery({
    queryKey: ['storeList'],
    queryFn: async () => {
      const res = await fetch('/api/store/list', { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const dehydratedState = dehydrate(qc);

  return (
    <html lang='en'>
      <head />
      <body>
        {/* 카카오맵 SDK 로드 - 모든 페이지에서 사용 가능하도록 */}
        <KakaoMapScript />

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

        <ReactQueryProvider dehydratedState={dehydratedState}>
          <Suspense fallback={<div>페이지를 불러오는 중입니다...</div>}>
            <AuthProvider>
              {children}
              <Analytics />
            </AuthProvider>
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
