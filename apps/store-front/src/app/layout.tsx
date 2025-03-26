'use client';

import { ReactNode, Suspense } from 'react';

import { createTheme, ThemeProvider } from '@mui/material';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
      </body>
    </html>
  );
}
