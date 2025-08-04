'use client';

import Image from 'next/image';

import { Button, ErrorFallback } from '@repo/design-system/components/b2c';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps, Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';

export const ProfileCompleteScreen: ActivityComponentType<'ProfileCompleteScreen'> = () => {
  return (
    <Screen header={<Header title='회원가입 완료' />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={ProfileCompleteErrorFallback} onReset={reset}>
            <Suspense>
              <ProfileCompleteContent />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Screen>
  );
};

const ProfileCompleteContent = () => {
  const { user } = useAuth();
  const flow = useFlow();

  return (
    <div className='flex flex-col p-grid-margin'>
      <Header title='회원가입 완료' />

      <div className='h-[calc(100dvh-100px)] w-full flex flex-col justify-between items-center'>
        <div className='flex flex-col h-full justify-center items-center'>
          <Image
            src='/images/foodingImage.png'
            width={93}
            height={122}
            alt='foodingImage'
            className='mb-10'
          />
          <div className='flex flex-col h-[65px] justify-between text-center'>
            <p className='headline-3'>{user?.nickname}님, 환영합니다!</p>
            <p className='body-1'>푸딩과 함께 특별한 한 끼를 시작해요!</p>
          </div>
        </div>
        <div className='flex w-full'>
          <Button size='large' onClick={() => flow.push('HomeTab', {})}>
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
};
const ProfileCompleteErrorFallback = ({ reset }: ErrorBoundaryFallbackProps) => {
  return (
    <ErrorFallback className='flex-1'>
      <ErrorFallback.Title>내 정보를 불러오지 못했어요.</ErrorFallback.Title>
      <ErrorFallback.Actions>
        <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
      </ErrorFallback.Actions>
    </ErrorFallback>
  );
};
