'use client';

import { ReactNode } from 'react';

import './globals.css';
import Layout from '@/components/Home/Layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
