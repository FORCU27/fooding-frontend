'use client';
import Image from 'next/image';
import { useState } from 'react';

import { Input, Button } from '@repo/design-system/components/b2c';

export default function StoreSelectPage() {
  const [storeName, setStoreName] = useState('');

  return (
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
        <div className='bg-white rounded-2xl shadow-lg w-[400px] p-8 text-center'>
          <p className='text-red-500 font-bold text-lg mb-2'>fooding 사장님</p>
          <p className='font-semibold text-center mb-4'>
            사장님을 위한 전용 공간에 오신 걸 환영합니다
          </p>
          <hr className='w-full my-4 border-gray-200' />
          <p className='text-gray-500 text-sm mb-6'>관리할 매장이 없습니다</p>

          <Input
            placeholder='매장명을 입력해주세요'
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className='mb-4'
          />

          <Button
            disabled={!storeName.trim()}
            onClick={() => console.log('매장 생성하기 클릭', storeName)}
            className='w-full py-3 rounded-full'
          >
            매장 생성하기
          </Button>
        </div>
      </main>
    </div>
  );
}
