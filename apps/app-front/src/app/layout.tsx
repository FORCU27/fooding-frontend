
import { ReactNode, Suspense } from 'react';
import MuiProvider from '../components/provider/MuiProvider';
import IntlProvider from '../components/provider/IntlProvider';

import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='font-pretendard'>
        <Suspense fallback={<div>Loading...</div>}>
            <IntlProvider>
                <MuiProvider>
                    {children}
                </MuiProvider>
            </IntlProvider>
        </Suspense>
      </body>
    </html>
  );
}
