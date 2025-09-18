'use client';

import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
          <div className='w-[450px]'>{children}</div>
        </div>
      </div>
    </div>
  );
}
