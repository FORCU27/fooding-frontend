'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logo = () => (
  <div className='absolute top-4 right-4'>
    <Image
      src='/fooding-logo-white.png'
      alt='Fooding'
      width={150}
      height={40}
      style={{ width: 'auto', height: '40px' }}
    />
  </div>
);

const StoreName = () => (
  <div className='space-y-2'>
    <h2 className='text-2xl text-secondary'>어서오세요</h2>
    <h1 className='text-4xl font-bold text-secondary'>민서네 김밥 짱짱 홍대점 입니다</h1>
  </div>
);

const WaitingInfo = () => (
  <div className='text-lg mt-8 space-y-2 text-secondary-light'>
    <p>휴대폰 번호를 입력하시면</p>
    <p>카카오톡으로 실시간 웨이팅 현황을 알려드려요</p>
  </div>
);

const WaitingStats = () => (
  <div className='grid grid-cols-2 gap-8 mt-12'>
    <div>
      <h3 className='text-2xl mb-4 text-secondary'>현재 웨이팅</h3>
      <p className='text-primary text-6xl font-bold'>3<span className='text-3xl ml-2'>팀</span></p>
    </div>
    <div className='border-l border-gray-300 pl-8'>
      <h3 className='text-2xl mb-4 text-secondary'>예상시간</h3>
      <p className='text-primary text-6xl font-bold'>7<span className='text-3xl ml-2'>분</span></p>
    </div>
  </div>
);

const ActionButtons = () => {
  const router = useRouter();
  
  return (
    <div className='flex gap-4 mt-12'>
      <button 
        className='px-8 py-4 rounded-full bg-primary text-white text-lg font-medium hover:bg-primary-dark'
        onClick={() => router.push('/store/register')}
      >
        바로 줄서기
      </button>
      <button className='px-8 py-4 rounded-full bg-background-primary text-secondary text-lg font-medium border border-gray-200 hover:bg-gray-100'>
        웨이팅 목록
      </button>
    </div>
  );
};

const MainContent = () => (
  <div className='flex-1 max-w-4xl'>
    <StoreName />
    <WaitingInfo />
    <WaitingStats />
    <ActionButtons />
  </div>
);

const FoodImage = () => (
  <div className='absolute bottom-0 right-0 w-[600px]'>
    <Image
      src='/food-image.png'
      alt='음식 이미지'
      width={600}
      height={400}
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

export default function WaitingPage() {
  return (
    <div className='flex h-screen border-l-20 border-primary-pink bg-primary-pink'>
      <div className='flex-[2] bg-white p-16 relative'>
        <MainContent />
        <FoodImage />
      </div>
      <div className='flex-1 bg-primary-pink relative'>
        <Logo />
      </div>
    </div>
  );
}
