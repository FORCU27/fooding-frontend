'use client';

import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import { createTheme, ThemeProvider } from '@mui/material';

import Footer from '@/components/Footer';
import Analytics from '@/components/GA/Analytics';
import Header from '@/components/Header';
import { GA_TRACKING_ID } from '@/lib/GA/gtag';
import ThemeRegistry from '@/lib/mui/registry';

import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = createTheme({
    typography: {
      fontFamily: '"Pretendard", sans-serif',
    },
    palette: {
      mode: 'light', //TODO: 나중에 다크모드 추가?
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderColor: '#c5c5c5',
            color: '#1a1a1a',
          },
        },
      },
    },
  });

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
      <body className='font-pretendard'>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeRegistry>
            <ThemeProvider theme={theme}>
              <Header theme={theme.palette.mode} />
              {children}
              <Footer />
            </ThemeProvider>
          </ThemeRegistry>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
