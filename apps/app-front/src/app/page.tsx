'use client';

import { NextPage } from 'next';

const Home: NextPage = () => {
  const handleAlert = () => {
    alert('APP-FRONT!');

    if (window.interop) {
      window.interop.setBadgeCount(12345);
    } else {
      console.warn('Interop not available');
    }
  };

  const handleLogoutClick = async () => {
    try {
      // 로그아웃 요청 보내기
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <main className='h-dvh flex flex-col justify-center items-center bg-gray-100 '>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>app-front</h1>
      <button
        type='button'
        onClick={handleAlert}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
      >
        HELLO WORLD
      </button>
      <button
        type='button'
        onClick={handleLogoutClick}
        className='px-4 py-2 mt-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
      >
        로그아웃
      </button>
    </main>
  );
};

export default Home;
