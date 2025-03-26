import { Suspense } from 'react';

import { Metadata } from 'next';

import AdminLayout from '@/components/Layout/AdminLayout';
import { AuthProvider } from '@/libs/auth';
import './globals.css';
import ThemeRegistry from '@/libs/mui/themeRegistry';

// import { CacheProvider } from '@emotion/react'
// import { Inter } from 'next/font/google'
// import { cache } from '@emotion/css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZAPP',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='font-pretendard'>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeRegistry initialMode='dark'>
            <AuthProvider>
              <AdminLayout>{children}</AdminLayout>
            </AuthProvider>
          </ThemeRegistry>
        </Suspense>
      </body>
    </html>
  );
}
