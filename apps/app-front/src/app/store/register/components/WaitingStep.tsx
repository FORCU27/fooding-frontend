'use client';

import Image from 'next/image';
import React from 'react';

export function WaitingStep({ countdownTime }: { countdownTime: number }) {
  return (
    <div className='flex h-screen'>
      {/* 왼쪽 패널 */}
      <div className='w-1/2 bg-white flex flex-col justify-center items-center p-20'>
        <div className='w-full max-w-lg'>
          <Image src='/fooding-logo.png' alt='Fooding' width={280} height={70} className='mb-12' />
          <div className='flex items-center gap-2 mb-12'>
            {/* <Image
              src='/kakao.png'
              alt='KakaoTalk'
              width={32}
              height={32}
              className='bg-[#FEE500] rounded-md'
            /> */}
            <span className='text-xl'>카카오톡을 확인해주세요!</span>
          </div>
          <div className='text-[#FF4412] flex items-center gap-2'>
            <div className='w-6 h-6 rounded-full border border-[#FF4412] flex items-center justify-center text-sm'>
              {countdownTime}
            </div>
            <span>초 후 메인화면으로 이동합니다</span>
          </div>
        </div>
      </div>

      {/* 오른쪽 패널 */}
      <div className='w-1/2 bg-[#FF4412] flex flex-col justify-center items-center p-20 text-white'>
        <div className='w-full max-w-lg'>
          <h1 className='text-4xl font-bold mb-20 text-center'>웨이팅 번호</h1>
          <div className='text-[240px] font-bold leading-none mb-20 text-center'>1</div>
          <div className='text-center text-lg space-y-2'>
            <p>순서가 되면 카카오톡으로 알려드릴게요</p>
            <p>방문이 어렵다면 취소 또는 미루기를 이용해주세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
