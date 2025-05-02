'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { pageview } from '@/libs/ga/gtag';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag === 'undefined') {
      console.warn('Google Analytics gtag.js is not loaded yet.');
      return;
    }

    if (pathname) {
      const url = `${pathname}${searchParams ? '?' + searchParams : ''}`;
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}
