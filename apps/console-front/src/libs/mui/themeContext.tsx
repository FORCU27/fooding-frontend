'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderWrapper({
  children,
  initialMode = 'dark',
}: {
  children: ReactNode;
  initialMode?: 'light' | 'dark';
}) {
  const [mode, setMode] = useState<'light' | 'dark'>(initialMode); // 서버와 클라이언트 기본값 동일

  // 클라이언트에서 localStorage로 오버라이드
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  // mode 변경 시 localStorage에 저장
  // mode 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProviderWrapper');
  }
  return context;
}
