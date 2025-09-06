import './globals.css';

import React from 'react';

import { Metadata } from 'next';

import { Providers } from './providers';
import AdminLayout from '@/components/Layout/AdminLayout';

export const metadata: Metadata = {
  title: 'Fooding Admin',
  description: 'Fooding Admin Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <AdminLayout>{children}</AdminLayout>
        </Providers>
      </body>
    </html>
  );
}
