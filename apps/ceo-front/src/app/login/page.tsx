'use client';
import Image from 'next/image';
import { useState } from 'react';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useLoginForm } from '@/hooks/useLoginForm';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const { login } = useAuth();
  const loginForm = useLoginForm(login);

  return (
    <div className='flex flex-col'>
      <div className='flex w-screen'>
        {/* 왼쪽 일러스트 영역 (1380px 이상일 때만 보이도록) */}
        <div className='hidden md:flex flex-1 custom-hide:block overflow-hidden relative'>
          <Image
            src='/images/login-illust.png'
            alt='login illust'
            width={1380}
            height={1200}
            className='object-cover'
            style={{
              width: '1380px',
              height: '1200px',
              minWidth: '1380px',
              minHeight: '1200px',
            }}
          />
        </div>

        {/* 오른쪽 폼 영역 */}
        <div className='flex items-center justify-center w-full lg:w-[808px] relative'>
          <div className='absolute top-[50px] right-[60px]'>
            <Image src='/images/fooding-ceo-logo.svg' alt='logo' width={153} height={24} />
          </div>
          <div className='w-[450px]'>
            <h1 className='headline-2'>{isSignUp ? '회원가입' : '로그인'}</h1>
            <div className='h-[12px]' />
            <div className='flex flex-col gap-[4px]'>
              {!isSignUp && <p className='body-b'>사장님을 위한 전용 공간에 오신 걸 환영합니다.</p>}
              <button
                onClick={() => setIsSignUp((prev) => !prev)}
                className='flex body-6 text-blue-500 cursor-pointer'
              >
                {isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
              </button>
            </div>
            <div className='h-[45px]' />
            {isSignUp ? (
              <RegisterForm onSignupSuccess={() => setIsSignUp(false)} />
            ) : (
              <LoginForm {...loginForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
