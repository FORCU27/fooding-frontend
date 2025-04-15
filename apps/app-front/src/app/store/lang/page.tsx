'use client';

import { useTranslations } from 'next-intl';

import LanguageSelector from './LanguageSelector';

export default function WaitingPage() {
  const t = useTranslations('WaitingPage');

  return (
    <div className='h-screen'>
      <main className='flex flex-1 items-center justify-between p-8'>
        <div className='text-2xl font-medium'>{t('greeting')}</div>
        <LanguageSelector />
      </main>
    </div>
  );
}
