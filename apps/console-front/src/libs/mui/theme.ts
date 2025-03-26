/* eslint-disable quotes */
'use client';

import { createTheme } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#ffffff' : '#111111',
        paper: mode === 'light' ? '#ffffff' : '#111111',
      },
      text: {
        primary: mode === 'light' ? '#111111' : '#ffffff',
        secondary: mode === 'light' ? '#555555' : '#bbbbbb',
      },
    },
    typography: {
      fontFamily: "'Pretendard', sans-serif",
      fontWeightMedium: 500,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, // 버튼 모서리 둥글게
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: '#EC2323',
            '&.Mui-error': {
              color: '#EC2323',
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          icon: {
            justifyContent: 'center',
            alignContent: 'center',
            margin: 0,
          },
          message: {
            marginLeft: '4px',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root': {
              fontSize: 24,
              margin: 2,
            },
            '&.MuiCheckbox-root': {
              backgroundColor: 'transparent',
            },
            '&.Mui-checked': {
              color: '#FF4938',
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: '#999999',
            height: '24px',
            width: '24px',
          },
        },
      },
    },
  });

export default getTheme;
