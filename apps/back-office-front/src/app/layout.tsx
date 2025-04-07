import React from 'react';

import './globals.css';
import { Metadata } from 'next';

import AdminLayout from '@/components/Layout/AdminLayout';

export const metadata: Metadata = {
  title: 'FOODING-BACK-OFFICE',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
