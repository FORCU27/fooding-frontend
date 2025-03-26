'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React, { useState, ReactNode } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import getTheme from './theme';
import { ThemeProviderWrapper, useThemeContext } from './themeContext';

interface ThemeRegistryProps {
  children: ReactNode;
  initialMode?: 'light' | 'dark';
}

export default function ThemeRegistry({ children, initialMode = 'dark' }: ThemeRegistryProps) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui' });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }

      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;

      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = '';

    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProviderWrapper initialMode={initialMode}>
        <ThemeInner>{children}</ThemeInner>
      </ThemeProviderWrapper>
    </CacheProvider>
  );
}

function ThemeInner({ children }: { children: ReactNode }) {
  const { mode } = useThemeContext();
  const muiTheme = React.useMemo(() => getTheme(mode), [mode]);

  // CSS 변수 동적 업데이트
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--scrollbar-track',
      mode === 'light' ? '#e0e0e0' : '#333333',
    );
    document.documentElement.style.setProperty(
      '--scrollbar-thumb',
      mode === 'light' ? '#888888' : '#bbbbbb',
    );
  }, [mode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
