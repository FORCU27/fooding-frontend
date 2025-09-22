'use client';

import Image from 'next/image';

import { cn } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';

import StoreSetupCard from './components/StoreSetupCard';

// TODO: 매장이 많아졌을 때 UI 개선
// TODO: 최대 매장 수 초과 시 UI 개선
// TODO: 매장 이름 중복 시 UI 개선
// TODO: 매장 이름 인풋 최소, 최대 길이 제한
export default function StoreSelectPage() {
  return (
    <Suspense>
      <div className='flex flex-col min-h-screen relative'>
        <div className='absolute inset-0 -z-10'>
          <Image
            src='/images/main-illust.png'
            alt='메인 배경 일러스트'
            fill
            className='object-cover'
            priority
          />
        </div>
        <main className='flex-1 flex items-center justify-center'>
          <div
            className={cn(
              'bg-white p-[60px] text-center flex flex-col items-center w-full',
              'max-tablet:min-h-dvh',
              'tablet:shadow-lg tablet:rounded-[30px] tablet:max-w-[571px] tablet:my-5',
            )}
          >
            <Suspense clientOnly>
              <StoreSetupCard />
            </Suspense>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
