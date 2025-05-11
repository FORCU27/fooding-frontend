'use client';

import { ReactNode } from 'react';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#18191c',
      paper: '#232429',
    },
    primary: {
      main: '#1976d2',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b3b8',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#18191c',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#232429',
        },
      },
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
} 