
'use client';

import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeRegistry from '@/lib/mui/registry';

export default function MuiProvider({ children }: { children: ReactNode }) {
  const theme = createTheme({
    typography: {
      fontFamily: '"Pretendard", sans-serif',
    },
    palette: {
      mode: 'light',
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

  const themeMode = theme.palette.mode;

  return (
    <ThemeRegistry>
      <ThemeProvider theme={theme}>
        <Header theme={themeMode} />
        {children}
        <Footer />
      </ThemeProvider>
    </ThemeRegistry>
  );
}