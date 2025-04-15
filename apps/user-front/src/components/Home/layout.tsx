'use client';

import { ReactNode } from 'react';

import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  themeColor?: 'light' | 'dark';
}

function Layout({ children, className, themeColor = 'light' }: LayoutProps) {
  return (
    <>
      <Main className={className} theme={themeColor}>
        {children}
      </Main>
      <Global styles={themeColor === 'dark' ? [darkThemeStyle] : []} />
    </>
  );
}

export default Layout;

const darkThemeStyle = css`
  body {
    background-color: 'black';
  }
`;

const Main = styled.main<{ theme: 'light' | 'dark' }>`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : 'black')};
`;
