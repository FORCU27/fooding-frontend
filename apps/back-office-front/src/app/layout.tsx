'use client';

import React, { Suspense } from 'react';

import AdminLayout from '@/components/Layout/AdminLayout';
import { AuthProvider } from '@/libs/auth';

// 'use client'
// import { CacheProvider } from '@emotion/react'
// import { Inter } from 'next/font/google'
// import { cache } from '@emotion/css'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Blog App',
//   description: 'A simple blog app using Next.js, GraphQL, and MongoDB',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='font-pretendard'>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <AdminLayout>{children}</AdminLayout>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
